/**
 * Cloudflare Worker for Hourly Push Notifications
 * Computes Personal Day Number based on User's local timezone
 */

export interface Env {
  PUSH_SUBSCRIPTIONS: KVNamespace;
  VAPID_PUBLIC_KEY: string;
  VAPID_PRIVATE_KEY: string;
  VAPID_SUBJECT: string;
}

export default {
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    console.log('Hourly Cron trigger executed:', controller.cron);
    
    // Cloudflare KV list can be paginated, keeping simple for now
    const { keys } = await env.PUSH_SUBSCRIPTIONS.list();
    
    for (const key of keys) {
      const dataStr = await env.PUSH_SUBSCRIPTIONS.get(key.name);
      if (!dataStr) continue;
      
      try {
        const userData = JSON.parse(dataStr);
        const tzOffset = userData.tzOffset || 0; // expected in hours (e.g. 5.5 for IST)
        
        const now = new Date();
        const localTimeMs = now.getTime() + tzOffset * 3600 * 1000;
        const localTime = new Date(localTimeMs);
        
        const localHour = localTime.getUTCHours();
        
        // We want to send notifications at exactly 9:00 AM local time
        if (localHour === 9) {
          const currentDay = localTime.getUTCDate();
          const currentMonth = localTime.getUTCMonth() + 1; // 1-12
          const mulank = userData.mulank || 1;
          
          let personalDay = (currentDay + currentMonth + mulank) % 9;
          if (personalDay === 0) personalDay = 9;
          
          console.log(`Would send Web Push to ${key.name}: Personal Day ${personalDay}`);
          
          // TODO: Implement web-push protocol request here using VAPID keys from env
        }
      } catch (err) {
        console.error('Error processing subscription:', key.name, err);
      }
    }
  },

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.method === 'POST') {
      try {
        const body: any = await request.json();
        if (body.endpoint && body.keys && body.mulank) {
          // Calculate client tzOffset in hours based on their Date object or send directly
          // For now, accept tzOffset from payload, default to 0
          const tzOffset = body.tzOffset || 0; 
          const payload = { ...body, tzOffset };
          
          // Use endpoint as unique key
          await env.PUSH_SUBSCRIPTIONS.put(body.endpoint, JSON.stringify(payload));
          return new Response('Subscription saved.', { status: 200 });
        }
      } catch (e) {
        return new Response('Invalid JSON payload.', { status: 400 });
      }
    }
    
    return new Response('Notifications worker active. Use POST to subscribe.', { status: 200 });
  },
};

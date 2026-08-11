/**
 * Cloudflare Worker for Daily Push Notifications
 * Scheduled to run daily via CRON trigger.
 */

export interface Env {
  // KV Namespace binding for stored push subscriptions
  PUSH_SUBSCRIPTIONS: KVNamespace;
  VAPID_PUBLIC_KEY: string;
  VAPID_PRIVATE_KEY: string;
}

// Basic math reduction for numerology
function reduceToSingleDigit(num: number): number {
  if (num < 10) return num;
  let sum = 0;
  let temp = num;
  while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
  }
  return reduceToSingleDigit(sum);
}

export default {
  // The scheduled handler is invoked by Cloudflare CRON triggers
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    console.log('Cron trigger executed:', controller.cron);
    
    // Example logic to fetch users and compute Personal Day Number
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // 1-12
    
    // In a real scenario, you'd iterate over all subscriptions in KV
    // For now, we simulate pulling a single subscription with a Mulank
    // const subscriptions = await env.PUSH_SUBSCRIPTIONS.list();
    // for (const key of subscriptions.keys) {
    //   const userData = await env.PUSH_SUBSCRIPTIONS.get(key.name, "json");
    //   const mulank = userData.mulank;
    //   const personalDay = reduceToSingleDigit(currentDay + currentMonth + mulank);
    //   // Send Web Push (Requires a WebPush library or fetch request to push service)
    // }
    
    console.log(`Computed Personal Day logic ready for execution.`);
  },

  // Also expose a fetch handler to register new subscriptions
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.method === 'POST') {
      const body: any = await request.json();
      if (body.endpoint && body.keys && body.mulank) {
        // Store subscription keyed by endpoint or unique ID
        await env.PUSH_SUBSCRIPTIONS.put(body.endpoint, JSON.stringify(body));
        return new Response('Subscription saved.', { status: 200 });
      }
      return new Response('Invalid payload.', { status: 400 });
    }
    
    return new Response('Notifications worker active. Use POST to subscribe.', { status: 200 });
  },
};

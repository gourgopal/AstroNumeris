// workers/cron-notifications.ts
var cron_notifications_default = {
  async scheduled(controller, env, ctx) {
    console.log("Hourly Cron trigger executed:", controller.cron);
    const { keys } = await env.PUSH_SUBSCRIPTIONS.list();
    for (const key of keys) {
      const dataStr = await env.PUSH_SUBSCRIPTIONS.get(key.name);
      if (!dataStr) continue;
      try {
        const userData = JSON.parse(dataStr);
        const tzOffset = userData.tzOffset || 0;
        const now = /* @__PURE__ */ new Date();
        const localTimeMs = now.getTime() + tzOffset * 3600 * 1e3;
        const localTime = new Date(localTimeMs);
        const localHour = localTime.getUTCHours();
        if (localHour === 9) {
          const currentDay = localTime.getUTCDate();
          const currentMonth = localTime.getUTCMonth() + 1;
          const mulank = userData.mulank || 1;
          let personalDay = (currentDay + currentMonth + mulank) % 9;
          if (personalDay === 0) personalDay = 9;
          console.log(`Would send Web Push to ${key.name}: Personal Day ${personalDay}`);
        }
      } catch (err) {
        console.error("Error processing subscription:", key.name, err);
      }
    }
  },
  async fetch(request, env, ctx) {
    if (request.method === "POST") {
      try {
        const body = await request.json();
        if (body.endpoint && body.keys && body.mulank) {
          const tzOffset = body.tzOffset || 0;
          const payload = { ...body, tzOffset };
          await env.PUSH_SUBSCRIPTIONS.put(body.endpoint, JSON.stringify(payload));
          return new Response("Subscription saved.", { status: 200 });
        }
      } catch (e) {
        return new Response("Invalid JSON payload.", { status: 400 });
      }
    }
    return new Response("Notifications worker active. Use POST to subscribe.", { status: 200 });
  }
};
export {
  cron_notifications_default as default
};
//# sourceMappingURL=cron-notifications.js.map

const scheduler = require("node-schedule");
const campaignService = require("../services/campaignService.js");

const expTimeJob = scheduler.scheduleJob("*/10 * * * * *", async () => {
  try {
    const campaigns = await campaignService.getAll();
    if (campaigns && campaigns.length > 0) {
      for (const campaign of campaigns) {
        if (campaign.exp_date.getTime() <= new Date().getTime()) {
          await campaignService.updateByCriteria(campaign.id, 'status', 3);
        }
      }
    }
  } catch (err) {
    console.log(err, 'In expTimeJob');
  }
});

module.exports = {
  expTimeJob
}
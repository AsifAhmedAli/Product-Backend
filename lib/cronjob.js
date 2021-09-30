var CronJob = require('cron').CronJob;

const runCronSchedule = () => {

    // Every half of month
    const firstJob = new CronJob('1 0 0 15 * *', function () {
        const d = new Date();
        console.log('Job 15:', d);
    });

    // Months with 31 days
    const secondJob = new CronJob('1 0 0 31 0,2,4,6,7,9,11 *', function () {
        const d = new Date();
        console.log('Job 31:', d);
    });

    // Months with 30 days
    const thirdJob = new CronJob('1 0 0 30 3,5,8,10 *', function () {
        const d = new Date();
        console.log('Job 30:', d);
    });

    // Month with 28 days
    const lastJob = new CronJob('1 0 0 28 1 *', function () {
        const d = new Date();
        console.log('Job 28:', d);
    });

    // job.start();
    firstJob.start();
    secondJob.start();
    thirdJob.start();
    lastJob.start();
}

module.exports = runCronSchedule;
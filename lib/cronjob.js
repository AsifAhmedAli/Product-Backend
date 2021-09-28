var CronJob = require('cron').CronJob;

const runCronSchedule = () => {
    console.log('Before job instantiation');

    const firstJob = new CronJob('1 0 0 15 * *', function () {
        const d = new Date();
        console.log('Job 15:', d);
    });
    const thirdJob = new CronJob('1 0 0 30 3,5,8,10 *', function () {
        const d = new Date();
        console.log('Job 30:', d);
    });
    const job = new CronJob('0 1 * * * *', function () {
        const d = new Date();
        console.log('Job farigh:', d);
    });
    const secondJob = new CronJob('1 0 0 31 0,2,4,6,7,9,11 *', function () {
        const d = new Date();
        console.log('Job 31:', d);
    });
    const lastJob = new CronJob('1 0 0 28 1 *', function () {
        const d = new Date();
        console.log('Job 28:', d);
    });
    const lastJob1 = new CronJob('1 01 0 28 1 *', function () {
        const d = new Date();
        console.log('Job 28 part 2:', d);
    });
    console.log('After job instantiation');

    // job.start();
    firstJob.start();
    secondJob.start();
    thirdJob.start();
    lastJob.start();
    lastJob1.start();
    job.start();
}

module.exports = runCronSchedule;
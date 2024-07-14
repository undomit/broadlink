export const getLearn = async (req, res) => {
    console.log('Learning mode...');
    
    const device = req.device;
    console.log(device);
    await device.enterLearning();
    
    const intervalId = setInterval(async () => {
        try {
            console.log('checking data..')
            
            const irPacket = await device.checkData();
            
            res.json({data: [...irPacket]});
            
            clearInterval(intervalId);
        } catch (err) {console.log(err + 'error')}
    }, 1000);
}
export const postIr = async (req, res) => {
    console.log('Sending ir data...');
    const data = req.body;
    const device = req.device;

    await device.sendData(data)

    res.json({data: 'success'});
}
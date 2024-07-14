export const postIr = async (req, res) => {
    console.log('Sending ir data...');
    const data = req.body;

    const response = await device.sendData(data)

    res.json({data: 'success'});
}
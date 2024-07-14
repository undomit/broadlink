export const getDiscover = async (req, res) => {
    console.log('Discovering...');
    const device = req.device;

    res.json({data: device});
}
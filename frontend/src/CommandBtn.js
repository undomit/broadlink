export const CommandBtn = ({name, data}) => {
    const handleSendIrData = async () => {
        const response = await fetch('http://localhost:3000/ir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
    }

    return (
        <button onClick={handleSendIrData}>{name}</button>
    )
}
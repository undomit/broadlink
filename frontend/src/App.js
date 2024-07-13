import './App.css';
import { useState, useRef, useEffect } from 'react';
import { CommandBtn } from './CommandBtn';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [device, setDevice] = useState();
  const [irData, setIrData] = useState();
  const [commands, setCommands] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const inputRef = useRef();
  const abortControllerRef = useRef();

  const handleSave = (name, data) => {
    console.log({name, data});
    setCommands([...commands, {name, data}]);
    setDialogIsOpen(false);
    inputRef.current.value = '';
  }

  const handleDiscover = async () => {
    try {
      const response = await fetch('http://localhost:3000/discover');
      const json = await response.json();
      setDevice(json.data);
    } catch (err) {
      setError('Something went wrong')
    }
  }

  const handleCancelDiscover = () => abortControllerRef.current.abort();

  const handleLearn = async () => {
    setLoading(true);
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    try {
      const response = await fetch('http://localhost:3000/learn', {signal});
      const json = await response.json();
      setIrData(json.data);
      setDialogIsOpen(true);
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleDiscover();
  }, []);

  return (
    <div className="App">
      <div className="container">
        {!device && <button onClick={handleDiscover}>Discover Device</button>}
        {device && <p>{device.model}</p>}
        {loading && (
          <div>
            <p>Learning...</p>
            <button onClick={handleCancelDiscover}>Cancel</button>
          </div>
        )}
        <button onClick={handleLearn}>Enter Learning Mode</button>
      </div>
      <div>
        {commands.map(({name, data}) => (
          <CommandBtn name={name} data={data} />
        ))}
      </div>
      <dialog open={dialogIsOpen}>
          <label>Enter Command Name</label>
          <input ref={inputRef} />
          <button onClick={() => handleSave(inputRef?.current?.value, irData)}>Save</button>
      </dialog>
    </div>
  );
}

export default App;

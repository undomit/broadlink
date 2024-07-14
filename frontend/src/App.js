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
  const buttonRef = useRef();
  const abortControllerRef = useRef();

  const handleSave = (name, data) => {
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

  const handleInputChange = () => {
    if (!inputRef.current?.value) {
      buttonRef.current.disabled = true;
    } else {
      buttonRef.current.disabled = false;
    }
  };

  useEffect(() => {
    handleDiscover();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="column">
          {device ?
            <p>Device found: {device.model}</p>
            :
            <button onClick={handleDiscover}>Discover Device</button>
          }
          {loading ? 
            (
              <div>
                <p>Learning...</p>
                <button onClick={handleCancelDiscover}>Cancel</button>
              </div>
            )
            :
            <button disabled={!device} onClick={handleLearn}>Enter Learning Mode</button>
          }
        </div>
        <div class="vertical-rule"></div>
        <div className="column">
          <div className="cmdContainer">
            {commands.map(({name, data}) => (
              <CommandBtn name={name} data={data} />
            ))}
          </div>
        </div>
      </div>
      {dialogIsOpen && 
        <dialog>
            <label>Enter Command Name</label>
            <input onChange={handleInputChange} ref={inputRef} />
            <button ref={buttonRef} onClick={() => handleSave(inputRef?.current?.value, irData)}>Save</button>
        </dialog>
      }
    </div>
  );
}

export default App;

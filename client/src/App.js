import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { GraphView } from './GraphView';
import { VictoryBanner } from './VictoryBanner';
import Sheets from './api/SheetsApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Games } from './transformers';
import { toast, ToastContainer, Flip } from 'react-toastify';

const validateGameResponses = (games) => {
  const errors = []
  games.forEach((g, i) => {
    if (g.error) {
      errors.push(`Game #${i + 1} (Row ${i + 2}) error: ${g.error}`)
    }
  })
  return errors
}

const notifyGameError = (text) => {
  toast.error(text, {
    autoClose: false,
  })
}

const App = () => {

  const [rowCount, setRowCount] = useState(0);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [errors, setErrors] = useState([]);
  const [showDisplay, setShowDisplay] = useState(false)
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const listener = (e) => {
      if (e.altKey && e.key === 'e') {
        setShowErrors(flag => !flag)
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener("keydown", listener)
  }, [setShowErrors])
  
  const computedGames = useMemo(() => Games(data, headers), [data, headers])
  useEffect(() => {
    if (showErrors) {
      setErrors(validateGameResponses(computedGames))
      return
    }
    setErrors([])
  }, [computedGames.length, showErrors])

  useEffect(() => {
    toast.dismiss()
    errors.forEach(notifyGameError)
  }, [errors])
  
  const fetchRowCount = useCallback(async () => setRowCount((await Sheets.rowcount()).count), [])

  const fetchAllRows = useCallback(async () => {
    const dataToSet = await Sheets.rows();
    setHeaders(dataToSet.headers)
    setData(dataToSet.values);
    setShowDisplay(true)
  }, [])

  // fetch all rows at start of application
  useEffect(() => {
    fetchAllRows();
    fetchRowCount();
  }, [fetchAllRows, fetchRowCount]);

  // poll row count in the sheet periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRowCount();
    }, 10 * 1000);
    return () => clearInterval(interval)
  }, [fetchRowCount])

  useEffect(() => {
    fetchAllRows()
  }, [rowCount, fetchAllRows]);

  return (<>
    <ToastContainer transition={Flip} position={'bottom-left'}/>
    <GraphView games={showDisplay ? computedGames.slice(0, computedGames.length - 1) : computedGames} />
    <VictoryBanner 
      show={showDisplay}
      game={computedGames[computedGames.length - 1] || undefined}
      onCloseCallback={() => setShowDisplay(false)}
    />
  </>
  );
}

export default App;

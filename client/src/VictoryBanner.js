import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { HighchartsGraphRenderer as Graph } from './renderers';
import { SimpleVictoryScreen } from './transformers';

export const VictoryBanner = ({
    game,
    show,
    onCloseCallback = () => {}
}) => {

    useEffect(() => {
        const timeout = setTimeout(onCloseCallback, 5 * 1000);
        return () => clearTimeout(timeout)
    }, [game, onCloseCallback]);

    return <Modal show={game && show}>
        <Modal.Body>
            <Graph data={[game]} transformer={SimpleVictoryScreen} /> 
        </Modal.Body>
    </Modal> 
}
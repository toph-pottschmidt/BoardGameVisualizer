import React from 'react';
import {
    Row,
    Container,
    Col
} from 'react-bootstrap';
import { HighchartsGraphRenderer as Graph } from './renderers';
import {
    GamesPlayedTransformer,
    WinCountTransformer,
    MostPopularGameTransformer,
    SocialNetworkGraphTransformer,
} from './transformers';

export const GraphView = ({ games }) => {

    console.log(games)

    const validGames = games && games.filter(g => !g.error)

    return validGames && validGames.length ? <Container fluid >
        <Row className="justify-content" md={2} sm={1}>
            <Col md={7}>
                <Graph data={validGames} transformer={GamesPlayedTransformer}/>
            </Col>
            <Col md={5}>
                <Graph data={validGames} transformer={WinCountTransformer} />
            </Col>
        </Row>
        <Row className="justify-content"  md={2} sm={1}>
            <Col md={7}>
                <Graph data={validGames} transformer={SocialNetworkGraphTransformer}/>
            </Col>
            <Col md={5}>
                <Graph data={validGames} transformer={MostPopularGameTransformer}/>
            </Col>
        </Row>
    </Container> : <></>;
};
/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { Button, Col, Figure, Row } from 'react-bootstrap';

import SPD_LOGO from '../../assets/spd_logo.png';
import FDP_LOGO from '../../assets/fdp_logo.png';
import LINKE_LOGO from '../../assets/linke_logo.svg';
import GRUENEN_LOGO from '../../assets/gruenen.png';
import AFD_LOGO from '../../assets/afd_logo.png';
import CDU_CSU_LOGO from '../../assets/cdu_csu_logo.png';
import { Faction } from '../../types';

export interface FactionSelectionProps {
  factions: Faction[];
  selectFaction: (faction: Faction | undefined) => void;
}

const FactionSelection: React.FC<FactionSelectionProps> = ({
  factions,
  selectFaction,
}) => {
  return (
    <div style={{ marginTop: 0 }}>
      <Row>
        <Col xs={4} md={2}>
          <Figure>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() =>
                selectFaction(
                  factions.find((faction) => faction.factionId === 'F002'),
                )
              }
            >
              <Figure.Image thumbnail alt="DIE LINKE" src={LINKE_LOGO} />
            </Button>
          </Figure>
        </Col>
        <Col xs={4} md={2}>
          <Figure>
            <Button
              variant="outline-light"
              size="lg"
              onClick={
                () =>
                  selectFaction(
                    factions.find((faction) => faction.factionId === 'F001'),
                  )
                // eslint-disable-next-line react/jsx-curly-newline
              }
            >
              <Figure.Image thumbnail alt="SPD" src={SPD_LOGO} />
            </Button>
          </Figure>
        </Col>
        <Col xs={4} md={2}>
          <Figure>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() =>
                selectFaction(
                  factions.find((faction) => faction.factionId === 'F003'),
                )
              }
            >
              <Figure.Image
                thumbnail
                alt="BÜNDNIS 90/DIE GRÜNEN"
                src={GRUENEN_LOGO}
              />
            </Button>
          </Figure>
        </Col>
        <Col xs={4} md={2}>
          <Figure>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() =>
                selectFaction(
                  factions.find((faction) => faction.factionId === 'F000'),
                )
              }
            >
              <Figure.Image thumbnail alt="CDU/CSU" src={CDU_CSU_LOGO} />
            </Button>
          </Figure>
        </Col>
        <Col xs={4} md={2}>
          <Figure>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() =>
                selectFaction(
                  factions.find((faction) => faction.factionId === 'F005'),
                )
              }
            >
              <Figure.Image thumbnail alt="FDP" src={FDP_LOGO} />
            </Button>
          </Figure>
        </Col>
        <Col xs={4} md={2}>
          <Figure>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() =>
                selectFaction(
                  factions.find((faction) => faction.factionId === 'F004'),
                )
              }
            >
              <Figure.Image thumbnail alt="AFD" src={AFD_LOGO} />
            </Button>
          </Figure>
        </Col>
      </Row>
    </div>
  );
};

export default FactionSelection;

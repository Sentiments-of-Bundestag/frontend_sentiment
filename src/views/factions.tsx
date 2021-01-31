import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

// Reducer Actions
import { Skeleton } from 'antd';
import {
  getFactionGraphsStart,
  getFactionProportionsStart,
  getFactionRanksStart,
  getFactionsStart,
} from '../slices/factions';
import {
  getPersonGraphsStart,
  getPersonMessagesStart,
  getPersonRanksStart,
} from '../slices/persons';
import { getSessionsStart } from '../slices/sessions';

// Selectors
import { getAllSessions } from '../selectors/sessions';
import { getAllFactions } from '../selectors/factions';

// Layout
import AppLayout from '../layout/AppLayout';

// Components
import { SessionSelection } from '../components/SessionSelection';
import LegislativePeriodSelection from '../components/selections/LegislativePeriodSelection';
import ToolTipWrapper from '../components/ToolTipWrapper';

// Plot related components
import FactionPiePlot from '../components/plots/FactionPiePlot';
import FactionPropotionBarPlot from '../components/plots/FactionPropotionBarPlot';
import FactionGraphCordPlot from '../components/plots/FactionGraphCordPlot';
import FactionSelection from '../components/selections/FactionSelection';

// Types
import { Faction, FactionProportion, Session } from '../types';
import FactionGraphBarPlot from '../components/plots/FactionGraphBarPlot';

interface FactionsProps {}

const Factions: React.FC<FactionsProps> = () => {
  const dispatch = useDispatch();
  const { sessions, areSessionsLoading } = useSelector(getAllSessions);
  const { factions, factionGraphs, factionRanks, factionProportion } = useSelector(getAllFactions);
  const legislativePeriods = Array.from(new Set(sessions.map((s) => s.legislativePeriod)));
  const [selectedFaction, setSelectedFaction] = React.useState<Faction | undefined>(undefined);

  // Initial load of data
  useEffect(() => {
    dispatch(getFactionsStart());
    dispatch(getFactionGraphsStart());
    dispatch(getFactionRanksStart());
    dispatch(getSessionsStart());
    dispatch(getPersonGraphsStart());
    dispatch(getPersonMessagesStart());
    dispatch(getPersonRanksStart());
    dispatch(getFactionProportionsStart());
  }, [dispatch]);

  useEffect(() => {
    if (factions.length > 0 && selectedFaction === undefined) {
      setSelectedFaction(factions[0]);
    }
  }, [factions]);

  const renderLegislativePeriodText = (): React.ReactNode => {
    const firstDate = sessions.length ? new Date(Date.parse(sessions[0].startDateTime)) : undefined;

    const lastDate = sessions.length
      ? new Date(Date.parse(sessions[sessions.length - 1].endDateTime))
      : undefined;

    return (
      <p className="text-justify">
        Die Legislaturperiode <b>{legislativePeriods.length ? legislativePeriods[0] : ''}</b> wurde
        am <b>{firstDate ? `${firstDate.getMonth()}/${firstDate.getFullYear()}` : ''}</b> gewählt
        und lief bis zum <b>{lastDate ? `${lastDate.getMonth()}/${lastDate.getFullYear()}` : ''}</b>
        . Zu dieser Periode wurden <b>{sessions.length}</b> Protokolle untersucht.
      </p>
    );
  };

  const renderBundestagZusammensetzungText = (): React.ReactNode => {
    return (
      <div className="text-justify">
        Der Bundestages der <b>{legislativePeriods.length ? legislativePeriods[0] : ''}</b> setzte
        sich aus den folgendenn <b>{factions.length}</b> Parteien zusammen:
        <ul>
          {factions.map((faction) => (
            <li key={faction.factionId}>
              <b>{faction.name}</b> mit <b>{faction.size}</b> Stimmen
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderBundestagParteilAnteilText = (): React.ReactNode => {
    const factionRankList: FactionProportion[] = [...factionProportion];
    factionRankList.sort((a, b) => a.proportion - b.proportion);

    const smallestFactionRank = factionRankList.length ? factionRankList[0] : undefined;
    const biggestFactionRank = factionRankList.length
      ? factionRankList[factionRankList.length - 1]
      : undefined;
    return (
      <div className="text-justify">
        Die folgende Grafik visualisiert den prozentualen Redeanteil der Parteien im Bundestag. Die
        Partei <b>{biggestFactionRank ? biggestFactionRank.name : ''}</b> hat mit{' '}
        <b>{biggestFactionRank ? biggestFactionRank.proportion.toFixed(2) : ''}% </b>
        den größten Redeanteil und die Partei{' '}
        <b>{smallestFactionRank ? smallestFactionRank.name : ''}</b> mit{' '}
        <b>{smallestFactionRank ? smallestFactionRank.proportion.toFixed(2) : ''}%</b> den
        geringsten Redeanteil.
      </div>
    );
  };

  const renderSentimentGeneralText = (): React.ReactNode => {
    return (
      <>
        <p className="text-justify">
          Die Methode der Sentiment Analyse, direkt übersetzt zu Stimmungserkennung, beschreibt die
          automatische Analyse von Texten um in einer Aussage eine positive oder negative Stimmung
          zu erkennen. Diese Zuordnung von Positiv und Negativ basiert auf vorher markierten
          Signalwörtern. Worte wie “kompetent” oder “freundlich” werden zum Beispiel mit positiven
          Meinungen assoziiert. Positiven Wörtern wird ein Wert zwischen 0 und 1 zugeordnet und
          negativen Wörtern ein Wert von 0 bis -1. Die Werte werden summiert um ganze Sätze oder
          Paragraphen zu bewerten. Durch dieses Verfahren wurden die Aussagen der Abgeordneten
          untersucht und somit die Stimmung der Parteien und der Personen untereinander ermittelt.
        </p>
        <br />
        <p className="text-justify">
          Im Sehnendiagramm werden sind die Stimmungen der Interaktionen zwischen den Parteien
          abgebildet. Die auf dem Rand liegenden Balken geben eine Gesamtstimmung der Partei wieder.
        </p>
      </>
    );
  };

  const renderSentimentGuidance = (): React.ReactNode => {
    return (
      <>
        <div className="text-justify">
          Hier können ein- und ausgehende Sentiments der einzelnen Parteien betrachtet werden.
        </div>
      </>
    );
  };

  const renderSentimentFromText = (): React.ReactNode => {
    return (
      <div className="text-justify">
        Stimmungsbild der von der SPD ausgehenden Kommentare an andere Parteien.
      </div>
    );
  };

  return (
    <>
      <AppLayout>
        <SessionSelection sessions={sessions} />
        <ToolTipWrapper text="Wähle zuerst eine Legislaturperiode aus, die du genauer betrachten möchtest.">
          <LegislativePeriodSelection
            legislativePeriods={legislativePeriods}
            label="Legislaturperiode"
            loading={areSessionsLoading}
          />
        </ToolTipWrapper>
        {renderLegislativePeriodText()}
        <h2>Zusammensetzung des Bundestages</h2>
        {renderBundestagZusammensetzungText()}
        <FactionPiePlot factions={factions} />
        <h2>Redeanteil der Parteien</h2>
        {renderBundestagParteilAnteilText()}
        <FactionPropotionBarPlot factionProportion={factionProportion} />
        <h2>Sentiment Analyse</h2>
        {renderSentimentGeneralText()}
        <FactionGraphCordPlot factions={factions} factionsGraph={factionGraphs} />
        {renderSentimentGuidance()}
        <br />
        <Alert variant="warning">
          <b> Wechsle zwischen den Parteien, indem du auf die Logos klickst..</b>
        </Alert>
        <FactionSelection factions={factions} selectFaction={setSelectedFaction} />
        <h3>
          Sentiment von {selectedFaction ? selectedFaction.name : <Skeleton.Button active />} zu
          anderen Parteien
        </h3>
        {renderSentimentFromText()}
        {selectedFaction ? (
          <FactionGraphBarPlot
            factions={factions}
            factionsGraph={factionGraphs}
            faction={selectedFaction}
          />
        ) : (
          <Skeleton />
        )}
      </AppLayout>
    </>
  );
};

export default Factions;

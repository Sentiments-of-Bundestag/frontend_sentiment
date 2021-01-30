import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { FactionRanked } from '../types';

export interface FactionRankBarPlotProps {
  factionRanks: FactionRanked[];
}

export const FactionRankBarPlot: React.FC<FactionRankBarPlotProps> = ({
  factionRanks,
}) => {
  const colors = [
    {
      factionId: 'F002', // DIE LINKE
      color: '#C7017F',
      rank: 0,
    },
    {
      factionId: 'F001', // SPD
      color: '#E50051',
      rank: 1,
    },
    {
      factionId: 'F003', // BÜNDNIS90/DIE GRÜNEN
      color: '#009879',
      rank: 2,
    },
    {
      factionId: 'F000', // CDU/CSU
      color: '#706F6F',

      rank: 3,
    },
    {
      factionId: 'F005', // FDP
      color: '#FFED00',
      rank: 4,
    },
    {
      factionId: 'F004', // AfD
      color: '#0085CC',
      rank: 5,
    },
  ];

  const data = factionRanks.map((node) => {
    const colorObj = colors.find((color) => color.factionId === node.factionId);
    const defaultColor = 'hsl(0, 0, 0)';
    const defaultRank = -1;

    return {
      faction: node.name,
      rang: node.rank,
      rank: colorObj ? colorObj.rank : defaultRank,
      color: colorObj ? colorObj.color : defaultColor,
    };
  });

  data.sort((a, b) => {
    return b.rank - a.rank;
  });

  return (
    <>
      <h2>Kommunikation der Parteien</h2>
      <p className="text-larger">
        Die Kommunikation einer Partei wird hier anhand des PageRank-Algorithmus
        berechnet. Das bedeutet je mehr eine Partei mit anderen Parteien
        kommuniziert, desto höher der PageRank-Wert. Die Summe aller
        Kommunikationen ist immer 1. Folglich muss der Wert immer in relation zu
        den anderen Werten betrachtet werden
      </p>
      <div style={{ height: 620 }}>
        <ResponsiveBar
          theme={{
            fontSize: 18,
          }}
          data={data}
          keys={['rang']}
          label={(d) => Number(d.value).toFixed(2)}
          indexBy="faction"
          margin={{ top: 20, right: 20, bottom: 150, left: 80 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ datum: 'data.color' }}
          tooltip={(d) => (
            <strong>
              Kommunikation: {d.value} <br />
            </strong>
          )}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[]}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 10,
            tickRotation: -30,
            tickPadding: 10,
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          enableLabel={true}
          labelSkipWidth={14}
          labelSkipHeight={12}
          labelTextColor="#000000"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </>
  );
};
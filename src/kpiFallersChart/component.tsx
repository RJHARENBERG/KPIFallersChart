import * as React from "react";


interface data {
    id: number,
    scope: string,
    iso: string,
    red: number,
    yellow: number,
    green: number
}

/**Gegevens weergeven met React
 *
 * U kunt gegevens weergeven met React. Het onderdeel kan gegevens weergeven op basis van de eigen status.*/
export interface State {
    RankingData: object[],

    size: number
}

export const initialState: State = {
    RankingData: [],

    size: 0
}

export class KpiFallersChart extends React.Component<{}> {

    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    /**Uw visual instellen om gegevens te verzenden
     *
     * In deze sectie werkt u uw visual bij om updates te verzenden naar exemplaren in het onderdeelbestand .*/
    private static updateCallback: (data: object) => void = null;

    public static update(newState: State) {
        if (typeof KpiFallersChart.updateCallback === 'function') {
            KpiFallersChart.updateCallback(newState);
        }
    }

    public state: State = initialState;

    public componentWillMount() {
        KpiFallersChart.updateCallback = (newState: State): void => {
            this.setState(newState);
        };
    }

    public componentWillUnmount() {
        KpiFallersChart.updateCallback = null;
    }

    /** hier sorteren van de status op kleur? of aparte variabele / kolommen maken van uit de data base?*/
    /** het renderen van het react component */
    render() {
        const {RankingData, size} = this.state;
        console.log(RankingData)

        const style: React.CSSProperties = {width: size, height: size};

        return (
            <>
                <div className="container" style={style}>
                    <div className="wrapper">
                        <div className="header">
                            <h1>Fallers</h1>
                            <p>Focus points since last month</p>
                        </div>
                        {RankingData.map((kpiData) => {
                            return (
                                <div className="faller-chart">
                                    <p className="costs">{kpiData[1]}</p>
                                    <ul>
                                        <li className="text">{kpiData[2]}</li>
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>

        )
    }
}

export default KpiFallersChart;
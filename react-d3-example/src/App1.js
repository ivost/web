import React from 'react';
import { ORFrame, XYFrame } from 'semiotic'

/*
https://medium.com/@Elijah_Meeks/using-semiotic-if-youve-never-used-react-8ee89d2350b3
*/
const answers = [
    { "question": "Question 1", "type": "disagree", "color": "#d38779", "value": -294, "percent": -0.09 },
    { "question": "Question 2", "type": "stronglydisagree", "color": "#b3331d", "value": -24, "percent": -0.007 },
    { "question": "Question 3", "type": "agree", "color": "#00a2ce", "value": 1927, "percent": 0.59 }
]


export default class App1 extends React.Component {
    render() {
        return (
        <div>
          <div>
            <XYFrame
                size={[700, 500]}
                points={[{price: 1.25, size: 15}, {price: 2.25, size: 12}]}
                pointStyle={{ fill: "black" }}
                xAccessor={"price"}
                yAccessor={"size"}
            />
          </div>

        <div>
        <ORFrame
            size={[700, 500]}
            data={answers}
            type="bar"
            projection="horizontal"
            oAccessor={"question"}
            rAccessor={"percent"}
            style={d => ({ fill: d.color })}
            margin={{ top: 30, bottom: 0, left: 80, right: 50 }}
            oPadding={20}
            oLabel={true}
            axis={{ orient: "top", tickValues: [-0.3, -0.15, 0, 0.2, 0.4, 0.6, 0.8, 1] }}
        />
        </div>
    </div>
    );
  }
}


//import { XYFrame } from 'semiotic'

// https://github.com/emeeks/semiotic/wiki/Visualizing-Time-Series-Data

// export default class App1 extends React.Component {
//     render() {
//       return (
//         <XYFrame
//             points={[{price: 1.25, size: 15}, {price: 2.25, size: 12}]}
//             pointStyle={{ fill: "blue" }}
//             xAccessor={"price"}
//             yAccessor={"size"}
//         />);
//     }
// }



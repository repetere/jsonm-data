/**
 * [[include:../manual/tutorial.md]]
 */
import React from "react";
/**
 * Simple Function Component Test
 * @param props.bar - test prop
 */
export const FuncComponent = (props) => (React.createElement("section", { title: props.bar },
    React.createElement("div", { className: "FuncComponent" },
        React.createElement("h1", null, "Hello Demo Function Component"),
        React.createElement("h2", null, "Just showing you how"))));
export class ClassComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("section", null,
            React.createElement("div", { className: "FuncComponent", title: this.props.bar },
                React.createElement("h1", null, "Hello Demo Function Component"),
                React.createElement("h2", null, "Just showing you how"))));
    }
}

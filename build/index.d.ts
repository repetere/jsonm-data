/**
 * [[include:../manual/tutorial.md]]
 */
import React from "react";
export interface Props {
    bar: string;
}
export interface State {
}
/**
 * Simple Function Component Test
 * @param props.bar - test prop
 */
export declare const FuncComponent: (props: Props) => JSX.Element;
export declare class ClassComponent extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
}

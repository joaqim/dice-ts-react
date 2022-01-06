import React, { Component } from "react";
import { App } from "./App";
import { Hello } from "./components/Hello";
import Test from "./components/Test";

export interface MainProps
{
    app: App;
}

export class Main extends Component<MainProps, {}>
{
    constructor(props: MainProps)
    {
        super(props);
    }

    public render(): JSX.Element
    {
        return (
            <>
                <Test/>
            </>
        );
    }
}
import React from "react";

export const ScoresPage = () => {

    return (
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1>High scores</h1>
            <ol>
                <li>John 30600</li>
                <li>Alan 29900</li>
                <li>Jennifer 29000</li>
            </ol>
        </div>
    )
};
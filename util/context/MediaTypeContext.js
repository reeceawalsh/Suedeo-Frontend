import React, { useState } from "react";

export const MediaTypeContext = React.createContext();

export function MediaTypeProvider({ children }) {
    const [mediaType, setMediaType] = useState("movie");

    const toggleMediaType = () => {
        setMediaType((prevType) => (prevType === "movie" ? "tv" : "movie"));
    };

    return (
        <MediaTypeContext.Provider value={{ mediaType, toggleMediaType }}>
            {children}
        </MediaTypeContext.Provider>
    );
}

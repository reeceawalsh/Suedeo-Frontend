import React, { useState } from "react";

export const MediaTypeContext = React.createContext();

// Controls which media type is currently being viewed, movie or tv. The default state is movie.
export function MediaTypeProvider({ children }) {
    const [mediaType, setMediaType] = useState("movie");

    // Toggles which media type is currently set.
    const toggleMediaType = () => {
        setMediaType((prevType) => (prevType === "movie" ? "tv" : "movie"));
    };

    return (
        <MediaTypeContext.Provider value={{ mediaType, toggleMediaType }}>
            {children}
        </MediaTypeContext.Provider>
    );
}

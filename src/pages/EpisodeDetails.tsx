import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import "../styles/episodeDetails.css";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const GET_EPISODE = gql`
  query GetEpisode($episodeId: ID!) {
    episode(id: $episodeId) {
      name
      air_date
      characters {
        id
        name
        species
      }
    }
  }
`;

const EpisodeId = () => {
  const params = useParams();
  const numericChars = Object.values(params)
    .join("")
    .replace(/[^0-9]/g, "");

  return numericChars;
};

interface EpisodeVariables {
  episodeId: number;
}

const EpisodeDetails: React.FC = () => {
  const [isResolutionAbove1000, setIsResolutionAbove1000] = useState<boolean>(
    window.innerWidth > 1000
  );
  const handleResize = () => {
    setIsResolutionAbove1000(window.innerWidth > 1000);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const episodeId = EpisodeId();
  const parsedEpisodeId: number = parseInt(episodeId, 10);
  interface Character {
    id: string;
    name: string;
    species: string;
  }

  interface EpisodeQueryResponse {
    episode: {
      name: string;
      air_date: string;
      characters: Character[];
    };
  }
  const { loading, error, data } = useQuery<
    EpisodeQueryResponse,
    EpisodeVariables
  >(GET_EPISODE, {
    variables: { episodeId: parsedEpisodeId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const EpisodeNumber: number = parsedEpisodeId - 31;

  const episode = data?.episode;

  if (!episode) return <p>No data found for the episode</p>;
  return (
    <div>
      <Header />
      <div className="main-container main-container-mobile-ep">
        <div
          className={isResolutionAbove1000 ? "left-side" : " "}
        >
          <Button name={"Episodes"} />
          <div className="left-side-ep">
            <h2 className="title-text title-text-ep">
              Characters of the{" "}
              <span className="highlight">
                {EpisodeNumber === 1
                  ? "1st"
                  : EpisodeNumber === 2
                  ? "2nd"
                  : EpisodeNumber + "th"}
              </span>{" "}
              episode of the <span className="highlight">4th </span>
              season of the series{" "}
              <span className="colored">Rick and Morty</span>
            </h2>
            <img
              src="\images\image.png"
              className="theme-img theme-img-ep"
              alt="image of Rick and Morty in a portal"
              
            ></img>
          </div>
        </div>
        <div className="right-side right-side-ep nowrap">
          <ul>
            {episode.characters.map(
              (
                character: { id: string; name: string; species: string },
                index: number
              ) => (
                <li
                  key={character.id}
                  className="character-info character-info-ep"
                >
                  <Link
                    to={`/CharacterDetails/${character.id}`}
                    className="character-name character-name-ep"
                    style={
                      index % 2 == 1
                        ? { color: "#BDD800" }
                        : { color: "#00BDD4" }
                    }
                  >
                    {" "}
                    {character.name}
                  </Link>

                  <div className="character-species character-species-ep">
                    {" "}
                    {character.species}
                  </div>
                  <hr className="horizontal-line horizontal-line-ep"></hr>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EpisodeDetails;

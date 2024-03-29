import React from "react";
import "../styles/characterDetails.css";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";

const GET_CHARACTER = gql`
  query GetCharacter($characterId: ID!) {
    character(id: $characterId) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
    }
  }
`;

const CharacterId = () => {
  const paramse = useParams();
  const numericChars = parseInt(
    Object.values(paramse)
      .join("")
      .replace(/[^0-9]/g, "")
  );

  return numericChars;
};

interface CharacterData {
  character: {
    name: string;
    status: string;
    image: string;
    species: string;
    type: string;
    gender: string;
    location: {
      name: string;
    };
    origin: {
      name: string;
    };
  };
}

interface CharacterVariables {
  characterId: number;
}

const CharacterDetails: React.FC = () => {
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

  const characterId = CharacterId();

  const { loading, error, data } = useQuery<CharacterData, CharacterVariables>(
    GET_CHARACTER,
    {
      variables: { characterId },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.character) return <p>No data found</p>;

  const { character } = data;

  return (
    <div>
      <Header />
      <div className="main-container main-container-ch ">
        <div className={isResolutionAbove1000 ? "left-side" : " "}>
          <div className="center-ch">
            <div className="button-pos-ch">
              <Button name={"Characters"} />
            </div>
            <h1 className="character-name-details">{character.name}</h1>
            <img
              src={character.image}
              alt={character.name}
              className="character-img img-ch"
            />
          </div>
        </div>
        <div className="right-side right-side-ch nowrap">
          <ul className="character-info character-info-ch">
            <li id="item1" className="item-d">
              {`${character.status === "" ? "-" : character.status}`}
              <p className="description">Status</p>
              <hr className="horizontal-line horizontal-line-ch"></hr>
            </li>
            <li id="item2" className="item-d">
              {`${character.species === "" ? "-" : character.species}`}
              <p className="description">Species</p>
              <hr className="horizontal-line horizontal-line-ch"></hr>
            </li>
            <li id="item3" className="item-d">
              {`${character.type === "" ? "-" : character.type}`}
              <p className="description">Type</p>
              <hr className="horizontal-line horizontal-line-ch"></hr>
            </li>
            <li id="item4" className="item-d">
              {`${character.gender === "" ? "-" : character.gender}`}
              <p className="description">Gender</p>
              <hr className="horizontal-line horizontal-line-ch"></hr>
            </li>
            <li id="item5" className="item-d">
              {`${character.origin.name === "" ? "-" : character.origin.name}`}
              <p className="description">Origin</p>
              <hr className="horizontal-line horizontal-line-ch"></hr>
            </li>
            <li id="item6" className="item-d">
              {`${
                character.location.name === "" ? "-" : character.location.name
              }`}
              <p className="description">Last known location</p>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CharacterDetails;

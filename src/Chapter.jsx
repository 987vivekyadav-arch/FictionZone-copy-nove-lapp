import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Chapter.css";

function Chapter() {

    const { id } = useParams();

    const [chapter, setChapter] = React.useState(null);

    useEffect(function() {

        fetch(`http://localhost:3000/chapters/${id}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setChapter(data);
            });

    }, [id]);


    return (
        <div className="chapter-page">

            {chapter && (

                <div>

                    <header className="chapter-header">

                        <Link to={`/novel/${chapter.novelId}`} className="chapter-back">
                            ←
                        </Link>

                        <div className="chapter-header-info">

                            <h2>
                                Chapter {chapter.chapterNumber} {chapter.title}
                            </h2>

                            <p>
                                FictionZone
                            </p>

                        </div>

                    </header>


                    <div className="chapter-settings">
                        ⚙
                        <span>18px</span>
                        <span>|</span>
                        <span>1.6x</span>
                    </div>


                    <main className="chapter-content">

                        <h1>
                            {chapter.title}
                        </h1>

                        <div className="story">

                            {chapter.content}

                        </div>


                        <div className="chapter-navigation">

                            <Link to={`/chapters/${Number(id)-1}`}>
                                ← Previous
                            </Link>

                            <Link to={`/chapters/${Number(id)+1}`}>
                                Next →
                            </Link>

                        </div>

                    </main>

                </div>

            )}

        </div>
    );
}

export default Chapter;
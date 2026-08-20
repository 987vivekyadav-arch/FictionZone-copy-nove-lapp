import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Novel.css";

function Novel({
    novel,
    setNovel,
    data,
    setData,
    chapters,
    setChapters,
}) {

    const {id} = useParams();

    const [singleNovel, setSingleNovel] = React.useState({});


    useEffect(function(){
        fetch(`http://localhost:3000/novels/${id}`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            setSingleNovel(data)
        })
    },[id]);


    useEffect(function(){
        fetch(`http://localhost:3000/chapters?novelId=${id}`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            setChapters(data)
        })
    },[id]);


    return(
        <div className="novel-page">

            {/* HEADER */}

            <header className="novel-header">

                <div className="novel-logo">
                    FictionZone
                </div>

                <Link to="/" className="back-home">
                    Home
                </Link>

            </header>


            {/* NOVEL MAIN */}

            <main className="novel-main">

                <div className="novel-hero">

                    <img
                        src={singleNovel.cover}
                        className="novel-main-cover"
                    />

                    <div className="novel-main-info">

                        <h1>
                            {singleNovel.title}
                        </h1>

                        <p className="novel-author">
                            {singleNovel.author}
                        </p>

                        <span className="novel-status">
                            {singleNovel.status}
                        </span>

                    </div>

                </div>


                {/* INFORMATION */}

                <div className="novel-details">

                    <div className="detail-card">

                        <div className="detail-label">
                            AUTHOR
                        </div>

                        <div className="detail-value">
                            {singleNovel.author}
                        </div>

                    </div>


                    <div className="detail-card">

                        <div className="detail-label">
                            GENRE
                        </div>

                        <div className="detail-value">
                            {singleNovel.genre}
                        </div>

                    </div>


                    <div className="detail-card">

                        <div className="detail-label">
                            STATUS
                        </div>

                        <div className="detail-value status-text">
                            {singleNovel.status}
                        </div>

                    </div>


                    <div className="detail-card">

                        <div className="detail-label">
                            CHAPTERS
                        </div>

                        <div className="detail-value">
                            {chapters.length}
                        </div>

                    </div>

                </div>


                {/* DESCRIPTION */}

                <section className="description-section">

                    <h2>
                        <span></span>
                        Synopsis
                    </h2>

                    <div className="description-box">

                        {singleNovel.description}

                    </div>

                </section>


                {/* CHAPTERS */}

                <section className="chapters-section">

                    <h2>
                        <span></span>
                        Chapters
                    </h2>

                    <p className="chapter-count">
                        {chapters.length} chapters available
                    </p>


                    <div className="chapter-list">

                        {chapters.map(function(item){

                            return(

                                <Link
                                    to={`/chapters/${item.id}`}
                                    key={item.id}
                                    className="chapter-card"
                                >

                                    <div className="chapter-number">
                                        {item.chapterNumber}
                                    </div>

                                    <div className="chapter-info">

                                        <div className="chapter-title">
                                            {item.title}
                                        </div>

                                    </div>

                                    <div className="chapter-status">
                                        ● LIVE
                                    </div>

                                </Link>

                            )

                        })}

                    </div>

                </section>

            </main>

        </div>
    )
}

export default Novel;
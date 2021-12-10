import React from 'react';
import './NavTest.css';
import {Link} from 'react-router-dom';

const NavTest = () => {
    return (
        <div>
          
            {/* <header class="header" id="header"> */}
            <header class="header" >
   
                <nav class="nav container">
 
                    <a href="#" class="nav__logo">Marlon</a>

                    <div class="nav__menu" id="nav-menu">
                        <ul class="nav__list">
                            <li class="nav__item">
                                <Link to='/patient' class="nav__link active-link">
                                    <i class='bx bx-home-alt nav__icon'></i>
                                    <span class="nav__name">Home</span>
                                </Link>
                            </li>
                            
                            <li class="nav__item">
                                <a href="#about" class="nav__link">
                                    <i class='bx bx-user nav__icon'></i>
                                    <span class="nav__name">About</span>
                                </a>
                            </li>

                            <li class="nav__item">
                                <a href="#skills" class="nav__link">
                                    <i class='bx bx-book-alt nav__icon'></i>
                                    <span class="nav__name">Skills</span>
                                </a>
                            </li>

                            <li class="nav__item">
                                <a href="#portfolio" class="nav__link">
                                    <i class='bx bx-briefcase-alt nav__icon'></i>
                                    <span class="nav__name">Portfolio</span>
                                </a>
                            </li>

                            <li class="nav__item">
                                <a href="#contactme" class="nav__link">
                                    <i class='bx bx-message-square-detail nav__icon'></i>
                                    <span class="nav__name">Contactme</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <img src="assets/img/perfil.png" alt="" class="nav__img" />
                </nav>
            </header>
            <main>
            {/* <!--=============== HOME ===============--> */}
            <section class="container section section__height" id="home">
                <h2 class="section__title">Home</h2>
            </section>

            {/* <!--=============== ABOUT ===============--> */}
            <section class="container section section__height" id="about">
                <h2 class="section__title">About</h2>
            </section>
{/* 
            <!--=============== SKILLS ===============--> */}
            <section class="container section section__height" id="skills">
                <h2 class="section__title">Skills</h2>
            </section>

            {/* <!--=============== PORTFOLIO ===============--> */}
            <section class="container section section__height" id="portfolio">
                <h2 class="section__title">Portfolio</h2>
            </section>

            {/* <!--=============== CONTACTME ===============--> */}
            <section class="container section section__height" id="contactme">
                <h2 class="section__title">Contactme</h2>
            </section>

            <section class="container section section__height" id="contactme1">
                <h2 class="section__title">Contactme</h2>
            </section>

            <section class="container section section__height" id="contactme2">
                <h2 class="section__title">Contactme</h2>
            </section>

            <section class="container section section__height" id="contactme3">
                <h2 class="section__title">Contactme</h2>
            </section>
        </main>
        </div>
    )
}

export default NavTest
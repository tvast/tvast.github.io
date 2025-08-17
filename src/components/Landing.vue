<template>
    <div>
        <!-- Hero Header Section -->
        <section class="hero-section">

            <transition name="fade-slide" appear>
                <h1 class="hero-title">Alien Computing | THEOPHILE VAST</h1>
            </transition>

            <a href="../../public/IA-FRONT_END-EN-FR-THEOPHILE-VAST.pdf" download="Theophile_Vast_Resume_EN_FR.pdf"
                class="resume-download-button">
                📄 Download Résumé (EN/FR)
            </a>
        </section>
        <MD/>
        <!-- <Masonry /> -->

        <!-- Timeline Section -->
        <Timeline :cv="cv" />
    </div>
</template>

<script>
import AnimatedLogo from './AnimatedLogo.vue';
import Timeline from './Timeline.vue';
import cv from '../assets/cv.json';
import Masonry from './Masonry.vue';
import MD from './MD.vue';

export default {
    name: 'HeroSection',
    components: { AnimatedLogo, Timeline, MD },
    data() {
        return {
            cv,
            offers: [
                { icon: '💻', label: 'Full Stack Apps' },
                { icon: '🛒', label: 'E-commerce' },
                { icon: '🚀', label: 'Landing Pages' },
            ],
        };
    },
};
</script>

<style scoped>
/* --- Hero Section --- */
.hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 1rem;
    background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
    font-family: 'Roboto', sans-serif;
    text-align: center;
    overflow: hidden;
}

.hero-title {
    font-family: 'Inter', sans-serif;
    font-size: 2.75rem;
    font-weight: 600;
    margin: 1.2rem 0 0.8rem;
    color: #212529;
}

.hero-subtitle {
    font-size: 1.2rem;
    color: #495057;
    margin-bottom: 2rem;
}

.offers-tab {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    background: #fff;
    padding: 1rem 2rem;
    border-radius: 2rem;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
}

.offer-item {
    font-weight: 600;
    text-transform: uppercase;
    color: #343a40;
    cursor: pointer;
    transition: all 0.3s ease;
}

.offer-item:hover {
    color: #007bff;
    transform: translateY(-2px);
}

.resume-download-button {
    display: inline-block;
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background-color: #0d6efd;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    border-radius: 40px;
    font-family: 'Inter', sans-serif;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.resume-download-button:hover {
    background-color: #084298;
    transform: translateY(-2px);
}

/* Fade Slide Transition */
.fade-slide-enter-active {
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-slide-enter {
    opacity: 0;
    transform: translateY(15px);
}

/* --- Timeline Panel Styles (inline with Hero) --- */
.timeline-content-wrapper {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 0;
}

.timeline-panel {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    cursor: pointer;
    overflow: hidden;
    max-height: 80px;
    width: 90%;
    transition: all 0.4s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.timeline-panel.expanded {
    max-height: 400px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.panel-header {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.event-icon i {
    font-size: 1.8rem;
    color: #6366f1;
}

.event-company {
    font-weight: 600;
    flex: 1;
}

.event-year {
    font-weight: 500;
    color: #4b5563;
}

.panel-body {
    margin-top: 1rem;
}

.panel-body ul {
    list-style: disc;
    padding-left: 1.2rem;
}

.panel-body span {
    font-style: italic;
    color: #334155;
}
</style>
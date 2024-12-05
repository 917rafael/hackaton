<script>
export default {
  name: "CarouselHeader",
  data() {
    return {
      slides: [
        {
          title: "Tradição do Forno",
          description: "Sabor e tradição em cada fatia do seu dia.",
          image: "https://example.com/path-to-your-bread-image1.jpg",
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.updateCarousel();
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.updateCarousel();
    },
    updateCarousel() {
      const carousel = this.$refs.carousel;
      if (carousel) {
        const offset = -this.currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
      }
    },
  },
  mounted() {
    this.updateCarousel();
  },
};
</script>

<template>
  <div class="carousel-container">
    <div class="carousel" ref="carousel">
      <div class="carousel-slide" v-for="(slide, index) in slides" :key="index">
        <header class="bread-header" :style="{ backgroundImage: `url(${slide.image})` }">
          <div class="bread-container">
            <h1 class="bread-title">{{ slide.title }}</h1>
            <div class="divider"></div> <!-- Linha divisória adicionada -->
            <p class="bread-description">{{ slide.description }}</p>
          </div>
        </header>
      </div>
    </div>
    <button class="carousel-control prev" @click="prevSlide">&#10094;</button>
    <button class="carousel-control next" @click="nextSlide">&#10095;</button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

.divider {
  height: 2px;
  background-color: white;
  margin: 10px 0;
}


.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
}

.bread-header {
  background-size: cover;
  background-position: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.bread-container {
  padding: 20px;
  border-radius: 8px;
  align-items: center;
  text-align: center  ;
  justify-content: center;
  height: 100%;
}

.bread-title {
  font-family: "Lobster", sans-serif;
  text-align: center  ;
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
}


.bread-description {
  font-size: 1.2rem;
  margin-top: 10px;
  text-align: center;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}
</style>

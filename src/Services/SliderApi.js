export const UpComingSliderApi = async () => {
  try {
    const upcomingOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: "en" }),
    };
    const responseUpcoming = await fetch(
      "http://54.221.169.56:3005/api/general-content/get-upcoming-movies/en",
      upcomingOptions
    );

    if (!responseUpcoming.ok) {
      throw new Error("Failed to fetch Upcoming Content Response");
    }

    const data = await responseUpcoming.json();
    return data;
  } catch (error) {
    console.error(error, "Error Coming from sliderAPI function");
  }
};

export const LatestSliderApi = async () => {
  try {
    const latestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: "en" }),
    };
    const responseUpcoming = await fetch(
      "http://54.221.169.56:3005/api/general-content/get-upcoming-movies/en",
      latestOptions
    );

    if (!responseUpcoming.ok) {
      throw new Error("Failed to fetch Latest Content Response");
    }

    const data = await responseUpcoming.json();
    return data;
  } catch (error) {
    console.error(error, "Error Coming from Latest APi function");
  }
};
export const VerticalSliderApi = async () => {
  try {
    const verticalOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: "en" }),
    };
    const response = await fetch(
      "http://54.221.169.56:3005/api/general-content/get-top-rated-content/en",
      verticalOptions
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Vertical Top Rated Content Response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error, "Error Coming from Vertical function");
  }
};

export const MainSliderApi = async () => {
  try {
    const mainOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://54.221.169.56:3005/api/sliders/get-slider-by-slider-type/home",
      mainOptions
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Main Slider Response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error, "Error Coming from Main Slider function");
  }
};

export const SuggestedApi = async () => {
  try {
    const suggestedOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: "en" }),
    };
    const response = await fetch(
      "http://54.221.169.56:3005/api/general-content/get-upcoming-movies/en",
      suggestedOptions
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Suggested API Response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error, "Error Coming from Suggested API function");
  }
};
export const TrendingApi = async () => {
  try {
    const trendingOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: "en" }),
    };
    const response = await fetch(
      "http://54.221.169.56:3005/api/general-content/get-upcoming-movies/en",
      trendingOptions
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Trending API Response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error, "Error Coming from trending API function");
  }
};
export const RecommendedApi = async () => {
  try {
    const recommendedOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: "en" }),
    };
    const response = await fetch(
      "http://54.221.169.56:3005/api/general-content/get-upcoming-movies/en",
      recommendedOptions
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recommended API Response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error, "Error Coming from recommended API function");
  }
};

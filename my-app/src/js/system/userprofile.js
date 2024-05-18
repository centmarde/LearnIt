import { supabase } from "../main";

// Function to upload photos using buckets in supabase
const inputFile = document.getElementById("input-file");

inputFile.addEventListener("change", async function () {
  const formData = new FormData();
  const image = inputFile.files[0];
  formData.append("input-file", image);

  try {
    const { data, error } = await supabase.storage
      .from("profilePic")
      .upload(image.name, image, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error("Failed to upload image: " + error.message);
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      throw new Error("Failed to fetch user data: " + userError.message);
    }

    const { data: updateData, error: updateError } = await supabase
      .from("user_infos")
      .update({
        image_path: data.path,
      })
      .eq("user_id", userData.user.id);

    if (updateError) {
      throw new Error("Failed to update user data: " + updateError.message);
    }

    console.log("Image uploaded successfully:", data);
    window.location.pathname = "./profile.html";
  } catch (error) {
    console.error("Error uploading image:", error.message);
  }
});

async function getUserInfo() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      throw new Error("Failed to fetch user data: " + userError.message);
    }

    const { data, error } = await supabase
      .from('user_infos')
      .select('first_name, last_name, birthdate')
      .eq('user_id', user.id);

    if (error) {
      throw new Error("Failed to fetch user data: " + error.message);
    }

    console.log("User First Name:", data[0].first_name);
    console.log("User Last Name:", data[0].last_name);
    console.log("User Birthdate:", data[0].birthdate);

    const displayFirstName = document.getElementById("first_name");
    displayFirstName.textContent = data[0].first_name + " ";

    const displayLastName = document.getElementById("last_name");
    displayLastName.textContent = data[0].last_name;

    const displayBirthdate = document.getElementById("birth_date");
    displayBirthdate.textContent = data[0].birthdate;

  

  } catch (error) {
    console.error("Error:", error.message);
  }
}








// Function to get user details
async function getDetails() {
  const baseURL = "https://xhfezetmnqhvulnqwles.supabase.co/storage/v1/object/public/profilePic/";
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      throw new Error("Failed to fetch user data: " + userError.message);
    }

    const { data, error } = await supabase
      .from("user_infos")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      throw new Error("Failed to fetch user data: " + error.message);
    }

    if (!data || data.length === 0) {
      console.error("No data found for user");
      return;
    }

    console.log("User First Name:", data[0].first_name);
    console.log("User Last Name:", data[0].last_name);
    console.log("User Birthdate:", data[0].birthdate);
    console.log("User Contact:", data[0].contact);
    console.log("User Bio:", data[0].bio);
    console.log("User About:", data[0].about);
    console.log("User path:", baseURL + data[0].image_path);

    const profilePic1 = document.getElementById("yawamo");
    profilePic1.src = baseURL + data[0].image_path;

    const profilePic = document.getElementById("myProfile");
    profilePic.src = baseURL + data[0].image_path;

    const displayFirstName = document.getElementById("first_name");
    displayFirstName.textContent = data[0].first_name + " ";

    const displayLastName = document.getElementById("last_name");
    displayLastName.textContent = data[0].last_name;

    const displayBirthdate = document.getElementById("birth_date");
    displayBirthdate.textContent = data[0].birthdate;

    const displayBio = document.getElementById("bio");
    displayBio.textContent = data[0].bio;

    const displayContact = document.getElementById("contact");
    displayContact.textContent = data[0].contact;

    const displayAbout = document.getElementById("about");
    displayAbout.textContent = data[0].about;

  } catch (error) {
    console.error("Error:", error.message);
  }
}

getDetails();
























const Bio1 = document.getElementById("BioExtract2");
Bio1.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(Bio1);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const { data: extract_info, error } = await supabase
      .from("user_infos")
      .update({
        bio: formData.get("bio1"),
      })
      .eq("user_id", user.id);

    if (error) {
      console.error("Supabase Error:", error);
      errorNotification("Error submitting data. Please try again.", 5);
    } else {
      successNotification("Data submitted successfully!", 5);
      extractDiet2.reset();
      // window.location.pathname = "./p.html";
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};



const Bio3 = document.getElementById("BioExtract3");
Bio3.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(Bio3);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const { data: extract_info, error } = await supabase
      .from("user_infos")
      .update({
        contact: formData.get("bio2"),
      })
      .eq("user_id", user.id);

    if (error) {
      console.error("Supabase Error:", error);
      errorNotification("Error submitting data. Please try again.", 5);
    } else {
      successNotification("Data submitted successfully!", 5);
      extractDiet2.reset();
      // window.location.pathname = "./p.html";
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const Bio2 = document.getElementById("BioExtract1");
Bio2.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(Bio2);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const { data: extract_info, error } = await supabase
      .from("user_infos")
      .update({
        about: formData.get("bio3"),
      })
      .eq("user_id", user.id);

    if (error) {
      console.error("Supabase Error:", error);
      errorNotification("Error submitting data. Please try again.", 5);
    } else {
      successNotification("Data submitted successfully!", 5);
      extractDiet2.reset();
      // window.location.pathname = "./p.html";
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const First_Name = document.getElementById("Full_Name");
First_Name.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(First_Name);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const { data: extract_info, error } = await supabase
      .from("user_infos")
      .update({
        first_name: formData.get("name_first"),
        last_name: formData.get("name_last"),
      })
      .eq("user_id", user.id);

    if (error) {
      console.error("Supabase Error:", error);
      errorNotification("Error submitting data. Please try again.", 5);
    } else {
      successNotification("Data submitted successfully!", 5);
      extractDiet2.reset();
      // window.location.pathname = "./p.html";
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};
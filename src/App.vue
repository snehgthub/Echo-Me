<template>
  <div v-show=!isEditMode>
    <div class="limiter">
      <div class="container-userprofile100" :style="{ backgroundImage: `url(${image})` }">
        <div class="wrap-userprofile100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form class="userprofile100-form validate-form">
            <span class="userprofile100-form-title p-b-49">
              Echo Me
            </span>

            <div class="wrap-input100 m-b-23">
              <span class="label-input100">Name</span>
              <span class="display100">{{ name }}</span>
              <span class="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div class="wrap-input100 m-b-23">
              <span class="label-input100">Email</span>
              <span class="display100">{{ email }}</span>
              <span class="focus-input100" data-symbol="&#x2709;"></span>
            </div>

            <div class="wrap-input100">
              <span class="label-input100">Interests</span>
              <span class="display100">{{ interests }}</span>
              <span class="focus-input100" data-symbol="&#x2764;"></span>
            </div>

            <div class="container-userprofile100-form-btn p-t-25">
              <div class="wrap-userprofile100-form-btn">
                <div class="userprofile100-form-bgbtn"></div>
                <button class="userprofile100-form-btn" @click.prevent="handleEditProfile">Edit Profile</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div v-show=isEditMode>
    <div class="limiter">
      <div class="container-userprofile100" :style="{ backgroundImage: `url(${image})` }">
        <div class="wrap-userprofile100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form class="userprofile100-form validate-form">
            <span class="userprofile100-form-title p-b-49">
              Echo Me
            </span>

            <div class="wrap-input100 validate-input m-b-23" data-validate="Name is required">
              <span class="label-input100">Name</span>
              <input class="input100" type="text" v-model="name" placeholder="Type your name" />
              <span class="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div class="wrap-input100 validate-input m-b-23" data-validate="Email is required">
              <span class="label-input100">Email</span>
              <input class="input100" type="email" v-model="email" placeholder="Type your email" />
              <span class="focus-input100" data-symbol="&#x2709;"></span>
            </div>

            <div class="wrap-input100 validate-input" data-validate="Interests are required">
              <span class="label-input100">Interests</span>
              <input class="input100" type="text" v-model="interests" placeholder="Type your interests" />
              <span class="focus-input100" data-symbol="&#x2764;"></span>
            </div>

            <div class="container-userprofile100-form-btn p-t-25">
              <div class="wrap-userprofile100-form-btn">
                <div class="userprofile100-form-bgbtn"></div>
                <button class="userprofile100-form-btn" @click.prevent="handleUpdateProfile">
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image from "../public/images/image.jpg"
export default {
  name: "App",
  data() {
    return {
      image: image,
      name: "",
      email: "",
      interests: "",
      isEditMode: false
    }
  },
  async created() {
    const userData = await this.fetchUserProfile()
    this.name = userData.name
    this.email = userData.email
    this.interests = userData.interests
  },
  methods: {
    handleEditProfile() {
      this.isEditMode = true
    },

    async handleUpdateProfile() {
      const payload = {
        name: this.name,
        email: this.email,
        interests: this.interests
      }
      const resJson = await this.updateUserProfile(payload)

      console.log(resJson)
      this.isEditMode = false
    },
    async fetchUserProfile() {
      const res = await fetch('get-profile')
      return await res.json()
    },
    async updateUserProfile(payload) {
      const res = await fetch('update-profile', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      })
      return await res.json()
    }
  }
}
</script>

<style></style>
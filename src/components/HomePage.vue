<template>
    <div id="mainDiv">
        <!-- <pre>{{ selectedCountry }}  {{ selectedState }} {{ selectedCity }}  </pre>
        <pre>{{ location }}</pre> -->
        <NavBar class="nav-bar" />

        <div class="outerDiv">
            <!-- <div id="imageDiv">
            </div> -->
            <div class="imgDiv">
                <img src="../assets/image/food.svg" alt="">
                <h1>
                    Step into a world of delicious possibilities
                </h1>

            </div>
            <div class="formDiv">

                <h2> Unlock a world of taste with every visit</h2>

                <form class="restaurantForm">

                    <div class="restaurant-and-contact">

                        <div class="form-group inputField">
                            <!-- <label for="restaurantName">Restaurant Name:</label> -->
                            <input type="text" class="input" id="restaurantName" v-model.trim="$v.restaurantName.$model"
                                :class="{
                                    'is-valid': !$v.restaurantName.$invalid,
                                    'is-invalid': $v.restaurantName.$error,
                                }" placeholder="Restaurant Name ..." />
                            <div class="invalid-feedback">
                                <span v-if="!$v.restaurantName.required">restaurantName is required !</span>
                            </div>
                        </div>

                        <div class="form-group inputField">
                            <!-- <label for="contactName">Contact Name:</label> -->
                            <input type="text" class="input" id="contactName" v-model.trim="$v.contactName.$model"
                                :class="{
                                    'is-valid': !$v.contactName.$invalid,
                                    'is-invalid': $v.contactName.$error,
                                }" placeholder="ContactName ..." />

                            <div class="invalid-feedback">
                                <span v-if="!$v.contactName.required">contactName is required !</span>
                            </div>
                        </div>
                    </div>

                    <div class="pincode-and-website">

                        <div class="form-group inputField">
                            <!-- <label for="pincode">Pincode:</label> -->
                            <input type="text" class="input" id="pincode" v-model.trim="$v.pincode.$model" :class="{
                                'is-valid': !$v.pincode.$invalid,
                                'is-invalid': $v.pincode.$error,
                            }" placeholder="Pincode" />

                            <div class="invalid-feedback">
                                <span v-if="!$v.pincode.required">pincode is required !</span>
                                <span v-if="!$v.pincode.isValidPincode && $v.pincode.required">Invalid Pincode</span>
                            </div>
                        </div>

                        <div class="form-group inputField">
                            <!-- <label for="website">Website:</label> -->
                            <input type="text" class="input" id="website" v-model.trim="$v.website.$model" :class="{
                                'is-valid': !$v.website.$invalid,
                                'is-invalid': $v.website.$error,
                            }" placeholder="http://www.google.com" />

                            <div class="invalid-feedback">
                                <span v-if="!$v.website.required">Website is required !</span>
                                <p v-if="$v.website.$error && $v.website.required">Invalid URL</p>
                            </div>

                        </div>
                    </div>

                    <div class="country-state-city">

                        <div class="form-group inputField locationDiv">
                            <label for="country">Country :</label>
                            <select v-model="selectedCountry" placeholder="Country" class="locationInput">
                                <option v-for="country in countries" :key="country.country_name">{{
                                    country.country_name
                                }}
                                </option>
                            </select>

                            <!-- <div class="invalid-feedback">
                                <span v-if="!$v.country.required">Country is required !</span>
                            </div> -->
                        </div>

                        <div class="form-group inputField locationDiv">
                            <label for="state">State :</label>
                            <select v-model="selectedState" class="locationInput">
                                <option v-for="state in states" :key="state.state_name">{{ state.state_name }}</option>
                            </select>
                        </div>

                        <div class="form-group inputField locationDiv">
                            <label for="city">City :</label>
                            <select v-model="selectedCity" class="locationInput">
                                <option v-for="city in cities" :key="city.city_name">{{ city.city_name }}</option>
                            </select>


                        </div>

                    </div>





                    <div class="phoneNumber-and-transaction">

                        <div class="form-group inputField">
                            <!-- <label for="phoneNumber">Phone Number:</label> -->
                            <input type="text" class="input" id="phoneNumber" placeholder="phoneNumber"
                                v-model.trim="$v.phoneNumber.$model" :class="{
                                    'is-valid': !$v.phoneNumber.$invalid,
                                    'is-invalid': $v.phoneNumber.$error,
                                }" />

                            <div class="invalid-feedback">
                                <span v-if="!$v.phoneNumber.required">phoneNumber is required !</span>
                            </div>

                        </div>

                        <div class="form-group inputField">
                            <!-- <label for="averageTransactions">Average Transactions:</label> -->
                            <input type="Number" class="input" id="averageTransactions"
                                placeholder="Average transaction..." v-model.trim="$v.averageTransactions.$model"
                                :class="{
                                    'is-valid': !$v.averageTransactions.$invalid,
                                    'is-invalid': $v.averageTransactions.$error,
                                }" />

                            <div class="invalid-feedback">
                                <span v-if="!$v.averageTransactions.required">averageTransactions is required !</span>
                            </div>

                        </div>
                    </div>




                    <div id="submitForm">
                        <button @click.prevent="submitForm" class="btn button">Submit</button>
                        <div v-if="submitSuccess" class="success">Form submitted successfully</div>
                        <div v-if="submitError" class="error">{{ submitError }}</div>

                    </div>

                </form>

            </div>

        </div>
    </div>
</template>
  

  

<script>
import NavBar from "./NavBar.vue";
import axios from 'axios';
import { required, url } from "vuelidate/lib/validators";
import Config from '@/config';


export default {
    name: "HomePage",
    components: {
        NavBar,
    },
    data() {
        return {
            restaurantName: '',
            contactName: '',
            pincode: '',
            location: '',
            website: '',
            phoneNumber: '',
            averageTransactions: '',
            submitSuccess: false,
            submitError: '',
            countries: [],
            states: [],
            cities: [],
            selectedCountry: null,
            selectedState: null,
            selectedCity: null,

        };
    },

    validations: {

        restaurantName: { required },
        contactName: { required },
        pincode: {
            required,
            isValidPincode: value => {
                return value.length === 6
            }
        },
        // country: { required },
        state: { required },
        city: { required },
        website: { required, url },
        phoneNumber: { required },
        averageTransactions: { required },
    },


    mounted() {
        this.getCountries();
    },

    watch: {
        selectedCountry(country) {
            console.log("Whatched : ")
            this.getStates(country);
        },

        selectedState(state) {
            console.log("State : ")
            this.getCities(state);
        },
    },


    methods: {
        // Access token for 
        async getAccessToken() {
            try {
                const response = await axios.get(
                    "https://www.universal-tutorial.com/api/getaccesstoken",
                    {
                        headers: {
                            "api-token": "tvgcax0tWyGxeB3gIVVqi9zpcD92CCqZbB8Epwj95BsJgONbZ6KuiCI1b0eUv0AJ7tg",
                            "user-email": "nileshdeshmukh0908@gmail.com",
                        },
                    }
                );
                return response.data.auth_token;

            } catch (error) {
                console.error(error);
            }
        },

        // Countries list 
        async getCountries() {
            try {
                const accessToken = await this.getAccessToken();
                console.log("access :", "bearer " + accessToken);
                const response = await axios.get(
                    "https://www.universal-tutorial.com/api/countries/",
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                );

                this.countries = response.data;
                console.log("Countries  :", this.countries[0]);
            } catch (error) {
                console.error(error);
            }
        },


        // GET States
        async getStates(country) {
            try {
                const accessToken = await this.getAccessToken();
                const response = await axios.get(
                    `https://www.universal-tutorial.com/api/states/${country}`,
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                );
                console.log("States : ", response.data[0]);
                this.states = response.data;
            } catch (error) {
                console.error(error);
            }
        },

        // GET Cities
        async getCities(state) {
            try {

                const accessToken = await this.getAccessToken();
                const response = await axios.get(
                    `https://www.universal-tutorial.com/api/cities/${state}`,
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                );
                console.log("Response : ", response.data[0]);
                this.cities = response.data;

            } catch (error) {
                console.error(error);
            }
        },



        async submitForm() {

            this.location = `${this.selectedCity}, ${this.selectedState}, ${this.selectedCountry}`;

            this.$v.$touch();
            if (this.$v.$invalid) {

                const addRestaurant = {
                    restaurantName: this.restaurantName,
                    contactName: this.contactName,
                    pincode: this.pincode,
                    location: this.location,
                    website: this.website,
                    phoneNumber: this.phoneNumber,
                    averageDailyTransactions: this.averageTransactions
                }
                // make API call to submit form
                // on success
                console.log("dataObj :", addRestaurant);
                axios
                    .post(`${Config.baseUrl}/restaurant`, addRestaurant)
                    .then(response => {
                        console.log("Success : ", response.data);
                        this.$toast.success(response.data.message);
                        console.log("RestaurantData :", response);
                    })
                    .catch(error => {
                        this.$toast.error('Please fix the errors and try again');
                        console.error(error);
                    });
                return;
            } else {
                this.submitSuccess = false;
                this.submitError = 'Please fix the errors and try again';
            }


        }
    }
}
</script>

<style scoped>
.outerDiv {
    display: flex;
    height: 100vh;
    /* background: rgb(209, 87, 17); */
    /* background: #4c44e3; */
    background :#fc7c6c;
    
}
h1 {
    /* margin: auto; */
    text-align: center;
    color: #d0d0d0;
}
.imgDiv {
    display: flex;
    width: 40%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* #imageDiv {
    background: #cd6060;
    width: 500px;
    height: 100vh;
} */


/* h1 {
    align-self: center;
} */

img {
    width: 250px;
   
    align-self: center;
    justify-content: center;
    margin: 20px auto ;
}

.formDiv {
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 100%;
    /* background: #346085;
     */
    /* background: #290248; */
    background:#fc7c6c;
    /* margin-top: 100px; */

}

.inputField {
    margin: 20px;
    /* background: #e06464; */
}

.restaurant-and-contact,
.pincode-and-website,
.phoneNumber-and-transaction,
.country-state-city {
    display: flex;
    justify-content: space-between;
}

#submitForm {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

.input {
    width: 400px;
    height: 45px;
    border: none;

}

.locationDiv {
    display: flex;
    flex-direction: column;
}

.locationDiv label {
    text-align: center;
}

.locationInput {
    width: 200px;
    height: 40px;
}

.submitForm {
    text-align: center;
}

.button {
    background: #f0aaa1;
}

@media screen and (max-width: 768px) {

    .outerDiv {
        padding-top: 100px;
        flex-direction: column;
    }

    .formDiv {
        flex-direction: column;
        flex-wrap: wrap;
    }

    .restaurant-and-contact,
    .pincode-and-website,
    .phoneNumber-and-transaction,
    .country-state-city {
        display: flex;
        flex-direction: column;
    }
}
</style>


<template>
    <div>
        <pre>{{ selectedCountry }}  {{ selectedState }} {{ selectedCity }}  </pre>
        <pre>{{ location }}</pre>
        <form>
             
            <div class="form-group">
                <label for="restaurantName">Restaurant Name:</label>
                <input type="text" id="restaurantName" v-model.trim="$v.restaurantName.$model" :class="{
                    'is-valid': !$v.restaurantName.$invalid,
                    'is-invalid': $v.restaurantName.$error,
                }" />
                <div class="invalid-feedback">
                    <span v-if="!$v.restaurantName.required">restaurantName is required !</span>
                </div>
            </div>

            <div class="form-group">
                <label for="contactName">Contact Name:</label>
                <input type="text" id="contactName" v-model.trim="$v.contactName.$model" :class="{
                    'is-valid': !$v.contactName.$invalid,
                    'is-invalid': $v.contactName.$error,
                }" />
            
                <div class="invalid-feedback">
                    <span v-if="!$v.contactName.required">contactName is required !</span>
                </div>
            </div>

            <div class="form-group">
                <label for="pincode">Pincode:</label>
                <input type="text" id="pincode" v-model.trim="$v.pincode.$model" :class="{
                    'is-valid': !$v.pincode.$invalid,
                    'is-invalid': $v.pincode.$error,
                }" />
                
                <div class="invalid-feedback">
                    <span v-if="!$v.pincode.required">pincode is required !</span>
                    <span v-if="!$v.pincode.isValidPincode && $v.pincode.required">Invalid Pincode</span>
                </div>
            </div>

            <div class="form-group">
                <label for="country">Country :</label>
                <select v-model="selectedCountry" style="width : 300px" >
                    <option v-for="country in countries" :key="country.country_name">{{ country.country_name }}</option>
                </select>

                <!-- <div class="invalid-feedback">
                    <span v-if="!$v.country.required">Country is required !</span>
                </div> -->
            </div>

            <div class="form-group">
                <label for="state">State :</label>
                <select style="width : 300px" v-model="selectedState">
                    <option v-for="state in states" :key="state.state_name">{{ state.state_name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="city">City :</label>
                <select style="width : 300px" v-model="selectedCity">
                    <option v-for="city in cities" :key="city.city_name">{{ city.city_name }}</option>
                </select>


            </div>

            <div class="form-group">
                <label for="website">Website:</label>
                <input type="text" id="website" v-model.trim="$v.website.$model" :class="{
                    'is-valid': !$v.website.$invalid,
                    'is-invalid': $v.website.$error,
                }" />
               
                <div class="invalid-feedback">
                    <span v-if="!$v.website.required">Website is required !</span>
                    <p v-if="$v.website.$error && $v.website.required">Invalid URL</p>
                </div>

            </div>

            <div class="form-group">
                <label for="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" v-model.trim="$v.phoneNumber.$model" :class="{
                    'is-valid': !$v.phoneNumber.$invalid,
                    'is-invalid': $v.phoneNumber.$error,
                }" />

                <div class="invalid-feedback">
                    <span v-if="!$v.phoneNumber.required">phoneNumber is required !</span>
                </div>

            </div>

            <div class="form-group">
                <label for="averageTransactions">Average Transactions:</label>
                <input type="Number" id="averageTransactions" v-model.trim="$v.averageTransactions.$model" :class="{
                    'is-valid': !$v.averageTransactions.$invalid,
                    'is-invalid': $v.averageTransactions.$error,
                }" />

                <div class="invalid-feedback">
                    <span v-if="!$v.averageTransactions.required">averageTransactions is required !</span>
                </div>

            </div>

            <button @click.prevent="submitForm">Submit</button>
            <div v-if="submitSuccess" class="success">Form submitted successfully</div>
            <div v-if="submitError" class="error">{{ submitError }}</div>
        </form>
    </div>
</template>
  

  

<script>
import axios from 'axios';
import { required, url } from "vuelidate/lib/validators";
import Config from '@/config';


export default {
    name: "HomePage",
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
        website: { required , url },
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
                        this.$toast.success( response.data.message );
                        console.log("RestaurantData :", response);
                    })
                    .catch(error => {
                        this.$toast.error(error);
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


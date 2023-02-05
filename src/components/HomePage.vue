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
                <!-- <div v-if="errors.contactName" class="error">{{ errors.contactName }}</div> -->
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
                <!-- <div v-if="errors.pincode" class="error">{{ errors.pincode }}</div> -->
                <div class="invalid-feedback">
                    <span v-if="!$v.pincode.required">pincode is required !</span>
                </div>
            </div>

            <div class="form-group">
                <label for="country">Country :</label>
                <!-- <input type="text" id="country" v-model.trim="country" @input="validateCountry" />
                <div v-if="errors.country" class="error">{{ errors.country }}</div> -->
                <select v-model.trim="selectedCountry" style="width : 300px" :class="{
                    'is-valid': !$v.pincode.$invalid,
                    'is-invalid': $v.pincode.$error,
                }">
                    <option v-for="country in countries" :key="country.country_name">{{ country.country_name }}</option>
                </select>

                <div class="invalid-feedback">
                    <span v-if="!$v.pincode.required">pincode is required !</span>
                </div>
            </div>

            <div class="form-group">
                <label for="state">State :</label>
                <!-- <input type="text" id="state" v-model.trim="state" @input="validateState" />
                <div v-if="errors.state" class="error">{{ errors.state }}</div> -->
                <select style="width : 300px" v-model.trim="selectedState" :class="{
                    'is-valid': !$v.contactName.$invalid,
                    'is-invalid': $v.contactName.$error,
                }">
                    <option v-for="state in states" :key="state.state_name">{{ state.state_name }}</option>
                </select>

                <div class="invalid-feedback">
                    <span v-if="!$v.pincode.required">pincode is required !</span>
                </div>
            </div>

            <div class="form-group">
                <label for="city">City :</label>
                <!-- <input type="text" id="city" v-model.trim="city" @input="validateCity" />
                <div v-if="errors.city" class="error">{{ errors.city }}</div> -->
                <select style="width : 300px" v-model.trim="selectedCity" :class="{
                    'is-valid': !$v.contactName.$invalid,
                    'is-invalid': $v.contactName.$error,
                }">
                    <option v-for="city in cities" :key="city.city_name">{{ city.city_name }}</option>
                </select>

                <div class="invalid-feedback">
                    <span v-if="!$v.pincode.required">pincode is required !</span>
                </div>
            </div>

            <!-- <div class="form-group">
                <label for="location">Location:</label>
                <input type="text" id="location" v-model.trim="location" @input="validateLocation" />
                <div v-if="errors.location" class="error">{{ errors.location }}</div>
            </div> -->

                <div class="form-group">
                    <label for="website">Website:</label>
                    <input type="text" id="website" v-model.trim="website" :class="{
                        'is-valid': !$v.contactName.$invalid,
                        'is-invalid': $v.contactName.$error,
                    }" />
                    <!-- <div v-if="errors.website" class="error">{{ errors.website }}</div> -->
                    <div class="invalid-feedback">
                        <span v-if="!$v.pincode.required">pincode is required !</span>
                    </div>

                </div>

                <div class="form-group">
                    <label for="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" v-model.trim="phoneNumber" :class="{
                        'is-valid': !$v.contactName.$invalid,
                        'is-invalid': $v.contactName.$error,
                    }" />
                    <!-- <div v-if="errors.phoneNumber" class="error">{{ errors.phoneNumber }}</div> -->

                    <div class="invalid-feedback">
                        <span v-if="!$v.pincode.required">pincode is required !</span>
                    </div>

                </div>

                <div class="form-group">
                    <label for="averageTransactions">Average Transactions:</label>
                    <input type="text" id="averageTransactions" v-model.trim="averageTransactions" :class="{
                        'is-valid': !$v.contactName.$invalid,
                        'is-invalid': $v.contactName.$error,
                    }" />
                    <!-- <div v-if="errors.averageTransactions" class="error">{{ errors.averageTransactions }}</div> -->

                    <div class="invalid-feedback">
                        <span v-if="!$v.pincode.required">pincode is required !</span>
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
import {
    required,
} from "vuelidate/lib/validators";
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
            errors: {
                restaurantName: '',
                contactName: '',
                pincode: '',
                selectedCountry: null,
                selectedState: null,
                selectedCity: null,
                location: '',
                website: '',
                phoneNumber: '',
                averageTransactions: '',
            },
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

        restaurantName: {
            required
        },

        contactName: {
            required
        },

        pincode: {
            required
        },

        country: {
            required
        },

        state: {
            required
        },

        city: {
            required
        },

        website: {
            required
        },

        phoneNumber: {
            required
        },

        averageTransactions: {
            required
        },
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
                console.log("Response : ", response.data[0]);
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

        validateRestaurantName() {
            if (!this.restaurantName) {
                this.errors.restaurantName = 'Restaurant Name is required';
            } else {
                this.errors.restaurantName = '';
            }
        },
        validateContactName() {
            if (!this.contactName) {
                this.errors.contactName = 'Contact Name is required';
            } else {
                this.errors.contactName = '';
            }
        },
        validatePincode() {
            if (!this.pincode) {
                this.errors.pincode = 'Pincode is required';
            } else if (!/^\d{6}$/.test(this.pincode)) {
                this.errors.pincode = 'Pincode must be a 6 digit number';
            } else {
                this.errors.pincode = '';
            }
        },
        validateCountry() {
            if (!this.selectedCountry) {
                this.errors.selectedCountry = 'Country is required';
            } else {
                this.errors.selectedCountry = null;
            }
        },
        validateState() {
            if (!this.selectedState) {
                this.errors.selectedState = 'State is required';
            } else {
                this.errors.selectedState = null;
            }
        },
        validateCity() {
            if (!this.selectedCity) {
                this.errors.selectedCity = 'City is required';
            } else {
                this.errors.selectedCity = null;
            }
        },
        validateLocation() {
            if (!this.location) {
                this.errors.location = 'Location is required';
            } else {
                this.errors.location = '';
            }
        },
        validateWebsite() {
            if (!this.website) {
                this.errors.website = 'Website is required';
            }
            //             else if (!/^https?:/ / [a - z0 - 9] + ([-.]{ 1 } [a - z0 - 9] +).[a - z]{ 2, 5 } (: [0 - 9]{ 1, 5 })?(/.)?$/i.test(this.website)) {
            //     this.errors.website = 'Website is not valid';
            // }
            else {
                this.errors.website = '';
            }
        },
        validatePhoneNumber() {
            if (!this.phoneNumber) {
                this.errors.phoneNumber = 'Phone Number is required';
            } else if (!/^\d{10}$/.test(this.phoneNumber)) {
                this.errors.phoneNumber = 'Phone Number must be a 10 digit number';
            } else {
                this.errors.phoneNumber = '';
            }
        },
        validateAverageTransactions() {
            if (!this.averageTransactions) {
                this.errors.averageTransactions = 'Average Transactions is required';
            } else if (!/^\d+$/.test(this.averageTransactions)) {
                this.errors.averageTransactions = 'Average Transactions must be a number';
            } else {
                this.errors.averageTransactions = '';
            }
        },

        submitForm() {

            this.location = `${this.selectedCity}, ${this.selectedState}, ${this.selectedCountry}`;
            // Validate all fields
            this.validateRestaurantName();
            this.validateContactName();
            this.validatePincode();
            this.validateLocation();
            this.validateWebsite();
            this.validatePhoneNumber();
            this.validateAverageTransactions();

            this.$v.$touch();

            if (this.$v.$invalid) {



                if (Object.keys(this.errors).length === 0) {
                    // make API call to submit form
                    // on success
                    this.submitSuccess = true;
                    this.submitError = '';
                    // reset form values
                    this.restaurantName = '';
                    this.contactName = '';
                    this.pincode = '';
                    this.location = '';
                    this.website = '';
                    this.phoneNumber = '';
                    this.averageTransactions = '';
                } else {
                    this.submitSuccess = false;
                    this.submitError = 'Please fix the errors and try again';
                }

                return;
            }


        }
    }
}
</script>


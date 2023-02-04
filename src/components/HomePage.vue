<template>
    <div>
        <form>
            <div class="form-group">
                <label for="restaurantName">Restaurant Name:</label>
                <input type="text" id="restaurantName" v-model="restaurantName" @input="validateRestaurantName" />
                <div v-if="errors.restaurantName" class="error">{{ errors.restaurantName }}</div>
            </div>

            <div class="form-group">
                <label for="contactName">Contact Name:</label>
                <input type="text" id="contactName" v-model="contactName" @input="validateContactName" />
                <div v-if="errors.contactName" class="error">{{ errors.contactName }}</div>
            </div>

            <div class="form-group">
                <label for="pincode">Pincode:</label>
                <input type="text" id="pincode" v-model="pincode" @input="validatePincode" />
                <div v-if="errors.pincode" class="error">{{ errors.pincode }}</div>
            </div>

            <div class="form-group">
                <label for="country">Country :</label>
                <!-- <input type="text" id="country" v-model="country" @input="validateCountry" />
                <div v-if="errors.country" class="error">{{ errors.country }}</div> -->
                <select v-model="selectedCountry" style="width : 300px">
                    <option v-for="country in countries" :key="country.country_name">{{ country.country_name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="state">State :</label>
                <input type="text" id="state" v-model="state" @input="validateState" />
                <div v-if="errors.state" class="error">{{ errors.state }}</div>
            </div>

            <div class="form-group">
                <label for="city">City :</label>
                <input type="text" id="city" v-model="city" @input="validateCity" />
                <div v-if="errors.city" class="error">{{ errors.city }}</div>
            </div>

            <div class="form-group">
                <label for="location">Location:</label>
                <input type="text" id="location" v-model="location" @input="validateLocation" />
                <div v-if="errors.location" class="error">{{ errors.location }}</div>
            </div>

            <div class="form-group">
                <label for="website">Website:</label>
                <input type="text" id="website" v-model="website" @input="validateWebsite" />
                <div v-if="errors.website" class="error">{{ errors.website }}</div>
            </div>

            <div class="form-group">
                <label for="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" v-model="phoneNumber" @input="validatePhoneNumber" />
                <div v-if="errors.phoneNumber" class="error">{{ errors.phoneNumber }}</div>
            </div>

            <div class="form-group">
                <label for="averageTransactions">Average Transactions:</label>
                <input type="text" id="averageTransactions" v-model="averageTransactions"
                    @input="validateAverageTransactions" />
                <div v-if="errors.averageTransactions" class="error">{{ errors.averageTransactions }}</div>
            </div>

            <button @click.prevent="submitForm">Submit</button>
            <div v-if="submitSuccess" class="success">Form submitted successfully</div>
            <div v-if="submitError" class="error">{{ submitError }}</div>
        </form>
    </div>
</template>
  

  

<script>
import axios from 'axios'
export default {
    name: "HomePage",
    data() {
        return {
            restaurantName: '',
            contactName: '',
            pincode: '',
            country: '',
            state: '',
            city: '',
            location: '',
            website: '',
            phoneNumber: '',
            averageTransactions: '',
            errors: {
                restaurantName: '',
                contactName: '',
                pincode: '',
                country: '',
                state: '',
                city: '',
                location: '',
                website: '',
                phoneNumber: '',
                averageTransactions: '',
            },
            submitSuccess: false,
            submitError: '',
            countries: [],
            selectedCountry: null,
        };
    },


    mounted() {
        this.getCountries();
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
            if (!this.country) {
                this.errors.country = 'Country is required';
            } else {
                this.errors.country = '';
            }
        },
        validateState() {
            if (!this.state) {
                this.errors.state = 'State is required';
            } else {
                this.errors.state = '';
            }
        },
        validateCity() {
            if (!this.location) {
                this.errors.city = 'City is required';
            } else {
                this.errors.city = '';
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
            // Validate all fields
            this.validateRestaurantName();
            this.validateContactName();
            this.validatePincode();
            this.validateLocation();
            this.validateWebsite();
            this.validatePhoneNumber();
            this.validateAverageTransactions();

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


        }
    }
}
</script>


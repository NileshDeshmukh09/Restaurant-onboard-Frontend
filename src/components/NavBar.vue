<template>
    <div>
        <div id="nav-bar">
            <nav class="navbar navbar-expand-lg navbar-light ">
                <div class="container-fluid">
                    <!-- Home page Router -->
                    <router-link class="navbar-brand nav-menu" to="/">YumExpress</router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                  
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: "NewNavBar",

};
</script>


<style>
.nav-menu {
    font-size: 17px;
    font-weight: 900;
}

.nav-link:hover {
    color: black;
    border-bottom: 20px;
}

#nav-bar {
    top: 0;
    background-color: #fc7c6c;
    /* box-shadow: 5px 5px 10px rgb(145, 143, 143); */
    position: fixed;
    width: 100%;
}
</style>
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div class="container-fluid">
            <a class="navbar-brand href=/'#">Afgha Proverbs</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="add-proverb-form">Add Proverb</a>
                    </li>
                </ul>
            </div>    
        </div>
    </nav>
</template>

<script>
    export default {
        name: "AppNavbar"
    };
</script>


<style scoped>
.navbar-brand {
    font-weight: bold;
}
</style>
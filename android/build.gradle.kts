plugins {
  id(libs.plugins.android.application.get().pluginId) apply false
  id(libs.plugins.android.library.get().pluginId) apply false
  id(libs.plugins.kotlin.android.get().pluginId) apply false
    id(libs.plugins.download.get().pluginId) apply false
}

android {
    compileSdk = 35
    defaultConfig {
        minSdk = 24
        targetSdk = 35
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.appcompat)
    implementation(libs.material)
    testImplementation(libs.junit)
}

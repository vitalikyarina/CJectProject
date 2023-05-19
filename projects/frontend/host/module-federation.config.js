const coreLibraries = new Set([
  "@angular/core",
  "@angular/common",
  "@angular/common/http",
  "@angular/router",
  "@ngxs/store",
  "rxjs",
]);

module.exports = {
  name: "frontend-host",
  remotes: ["frontend-comic"],
  shared: (libraryName, defaultConfig) => {
    if (coreLibraries.has(libraryName)) {
      console.log(libraryName);
      return defaultConfig;
    }

    // Returning false means the library is not shared.
    return false;
  },
};

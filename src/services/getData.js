import http from "./http-common";
import handleResponse from "../utils/handleResponse";

const getReferencesBySection = async (sectionId) => {
  // Get sections to spread in context SectionsContext
  return await http()
    .get(`references/section/${sectionId}`)
    .then((response) => response.status === 200 && response.data)
    .then(({ references }) =>
      references.sort(() => (Math.random() > 0.5 ? 1 : -1))
    )
    .catch(() => {
      return false;
    });
};

const getReferencesByTheme = async (themeId) => {
  // Get sections to spread in context SectionsContext
  return await http()
    .get(`references/theme/${themeId}`)
    .then((response) => response.status === 200 && response.data)
    .then(({ references }) => references)
    .catch(() => {
      return false;
    });
};

const getReferenceById = async (id) => {
  return await http()
    .get(`/references/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data.reference[0])
    .catch(() => false);
};

const getHomeCounters = async () => {
  return await http()
    .get(`counters/home`)
    .then((response) => response.status === 200 && response.data)
    .then((data) => data)
    .catch(() => {
      return {
        totalReferences: -1,
        totalContributors: -1,
        monthReferences: -1,
      };
    });
};

// Allows to get categories from each reference and send them in an array. Reduce method makes sure that you don't get any duplication.
// TODO: the dependency array for now has an empty string that I happen to have to shift before returning my new array. It would be best if we didn't need to do that (not urgent)
const findCategories = (references) => {
  const themeCategories = references.reduce(
    (categories, reference) => {
      if (!categories.includes(reference.category)) {
        categories.push(reference.category);
      }
      return categories;
    },
    [""]
  );
  themeCategories.shift();
  return themeCategories;
};

const getAllReferences = async (
  token,
  setUserCredentials,
  setToken,
  setIsLoggedIn,
  setLoggedOut
) => {
  return await http(token)
    .get("/references")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then(({ references }) => references)
    .catch((error) => {
      if (error.response.status === 498) {
        setLoggedOut(setUserCredentials, setToken, setIsLoggedIn);
      }
    });
};

const getUserReferences = async (
  token,
  setUserCredentials,
  setToken,
  setIsLoggedIn,
  setLoggedOut
) => {
  return await http(token)
    .get("/references/user")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then(({ references }) => references)
    .catch((error) => {
      if (error.response.status === 498) {
        setLoggedOut(setUserCredentials, setToken, setIsLoggedIn);
      }
    });
};

const setLoggedOut = (setUserCredentials, setToken, setIsLoggedIn) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUserCredentials({});
  setToken(null);
  setIsLoggedIn(false);
};

// Get what user types in searchReferences input and format it to be processed by backend
const getReferencesFromSearch = async (answer) => {
  let insert = answer.split(" ");
  insert =
    insert.length === 1
      ? (insert = insert.join(""))
      : (insert = insert.join("<->"));

  return await http()
    .get(`search/?answer=${insert}`)
    .then((result) => {
      if (result.status === 200) {
        return result.data;
      }
    })
    .then(({ search }) => search.sort(() => (Math.random() > 0.5 ? 1 : -1)))
    .catch(() => false);
};

// Get countries list from external API
const getCountries = async () => {
  return await http()
    .get("https://restcountries.com/v3.1/all")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((response) =>
      response
        .map((countryResult) => ({
          value: countryResult.translations.fra.common.toLowerCase(),
          name: countryResult.translations.fra.common.toLowerCase(),
          label: countryResult.translations.fra.common,
        }))
        .sort((a, b) => a.value.localeCompare(b.value))
    );
};

// Reuse of the search function of the SearchResult component to find similar references
const getReferencesByName = async () => {
  return await http()
    .get(`search/reference-name`)
    .then((result) => {
      if (result.status === 200) {
        return result.data;
      }
    })
    .then((data) =>
      data.search.map((reference) => ({
        id: reference.id,
        name: reference.reference_name,
      }))
    )
    .catch((_) => {
      return [];
    });
};

// Requests to the API to send a contribution
const postContribution = async (contribution, token) => {
  return await http(token)
    .post("references", contribution)
    .then((response) => {
      if (response.status === 202) {
        return false;
      }
    })
    .catch(({ response }) => {
      return response.data.error;
    });
};

// Requests to the API to update a contribution
const putContribution = async (id, token) => {
     await http(token)
      .put(`references/${id}`, {
        reference_status: 1,
      })
      .then((response) => {
        if (response.status === 202) {
          return true;
        }
      })
      .catch(() => {
        return false;
      });
  

  return false;
};

const signUp = async (user) => {
  return await http()
    .post(`auth/signUp`, {
      userName: user.name,
      userEmail: user.email,
      userPassword: user.password,
    })
    .then(({ status }) => {
      if (status === 201) {
        return false;
      }
    })
    .catch(({ response }) => {
      return response.data.error;
    });
};

const signIn = async (user, setUserData) => {
  return await http()
    .post(`/auth/signIn`, {
      userEmail: user.email,
      userPassword: user.password,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then(({ accessToken, user }) => {
      if (accessToken === null || accessToken === undefined) {
        throw new Error("No token");
      }
      setUserData(user, accessToken, true);
      return false;
    })
    .catch(({ response }) => {
      return response.data.error;
    });
};

const getAdminCounters = async (token) => {
  return await http(token)
    .get("/counters/dashboard/admin/")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then(({ counters }) => counters);
};

const getUserCounters = async (token) => {
  return await http(token)
    .get("/counters/dashboard/contributor")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then(({ counters }) => counters);
};

const getSections = async () => {
  // Get sections to spread in context SectionsContext
  return await http()
    .get(`sections`)
    .then((response) => response.status === 200 && response.data)
    .then((data) => {
      return data.sections;
    })
    .catch((error) => {
      // TODO : display the error in a dedicated location
    });
};

const getCategories = async () => {
  // Get categories to spread in context DataContext
  return await http()
    .get(`categories`)
    .then((response) => response.status === 200 && response.data)
    .then((data) => data.categories)
    .catch((error) => {
      // TODO : display the error in a dedicated location
    });
};

const getThemes = async () => {
  // Get themes to spread in context AllThemes
  return await http()
    .get(`themes`)
    .then((response) => {
      // TODO see the behavior of this function
      return handleResponse(response, 200);
    })
    .then((data) => data.themes)
    .catch((error) => {
      // TODO : display the error in a dedicated location
    });
};

export {
  getReferencesBySection,
  getReferencesByTheme,
  findCategories,
  getReferenceById,
  getHomeCounters,
  getAdminCounters,
  getUserCounters,
  getAllReferences,
  getUserReferences,
  setLoggedOut,
  getReferencesFromSearch,
  getCountries,
  getReferencesByName,
  postContribution,
  putContribution,
  signUp,
  signIn,
  getSections,
  getCategories,
  getThemes,
};

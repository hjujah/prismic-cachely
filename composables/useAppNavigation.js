import { get, find, mapValues, compact } from "lodash-es"

// -----------------------------------------------------------------------------
// CONFIG

const mapFields = {
  navMain: "main_navigation",
  navHeader: "header_navigation",
  navFooter: "footer_navigation"
}

// -----------------------------------------------------------------------------

export function useAppNavigation() {
  const { app } = useAppStore()

  // create array of objects
  const all = Object.keys(mapFields).map((key) => ({
    name: key,
    // @TODO change
    data: get(app, mapFields[key])
  }))

  // create object (for named export)
  const object = all.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: item.data }),
    {}
  )

  const parseNavigationGroupItem = (group) => {
    if (!group) {
      return false
    }

    let full_group = find(app.navigationGroups, { id: group.id })
    let navigation_groups = getAttr(full_group, "data.navigation_groups")

    if (!navigation_groups) {
      return full_group
    }

    full_group.parsed_groups = compact(
      navigation_groups
        .map((item) => item.navigation_group)
        .map((item) => parseNavigationGroupItem(item))
    )

    // console.log("parseddd full group", full_group)

    return full_group
  }

  const parseNavigationGroups = (group) =>
    mapValues(group, (item) => parseNavigationGroupItem(item))

  // get and parse the navigation groups
  const getNavigationGroups = (navigation) => {
    let navigation_groups = getAttr(navigation, "data.navigation_groups")

    // console.log("get nav groups", navigation_groups)

    if (!navigation_groups) {
      return []
    }

    navigation_groups = navigation_groups.map((item) => item.navigation_group)

    let groups = parseNavigationGroups(navigation_groups)

    // console.log("parseddd nav groups", groups)

    return groups
  }

  return {
    getNavigationGroups,
    all,
    ...object
  }
}

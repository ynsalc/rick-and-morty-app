import React, { useState } from "react";
import { genderArr, speciesArr, statusArr } from "constants/staticArr";

const Sidebar = ({ updateStatus, updateGender, updateSpecies, updatePage }) => {
  const [status, setUpdateStatus] = useState(statusArr);
  const [gender, setUpdateGender] = useState(genderArr);
  const [species, setUpdateSpecies] = useState(speciesArr);

  const changeStatus = (id) => {
    const statusStateList = status;
    const changeCheckedStatus = statusStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setUpdateStatus(changeCheckedStatus);
    const statusName = changeCheckedStatus.filter(
      (item) => item.checked === true
    );
    if (statusName.length > 0) {
      updateStatus(statusName[0].name);
    } else {
      updateStatus("");
    }
  };

  const changeGender = (id) => {
    const genderStateList = gender;
    const changeCheckedGender = genderStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setUpdateGender(changeCheckedGender);
    const genderName = changeCheckedGender.filter(
      (item) => item.checked === true
    );
    if (genderName.length > 0) {
      updateGender(genderName[0].name);
    } else {
      updateGender("");
    }
  };

  const changeSpecies = (id) => {
    const speciesStateList = species;
    const changeCheckedSpecies = speciesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setUpdateSpecies(changeCheckedSpecies);
    const speciesName = changeCheckedSpecies.filter(
      (item) => item.checked === true
    );
    if (speciesName.length > 0) {
      updateSpecies(speciesName[0].name);
    } else {
      updateSpecies("");
    }
  };

  const clearFilter = () => {
    updateGender("");
    updateSpecies("");
    updateStatus("");
    updatePage(1);
    setUpdateGender(genderArr);
    setUpdateSpecies(speciesArr);
    setUpdateStatus(statusArr);
  };
  return (
    <div className="lg:w-auto md:w-auto sm:w-auto mt-4 rounded-lg">
      <h3 className="mb-4 font-semibold text-gray-900">Status</h3>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
        {status.map((item) => (
          <li
            key={item.id}
            className="w-full rounded-t-lg border-b border-gray-200"
          >
            <div className="flex items-center pl-3">
              <input
                id={`${item.id}-status`}
                type="checkbox"
                checked={item.checked}
                onChange={() => changeStatus(item.id)}
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor={`${item.id}-status`}
                className="py-3 ml-2 w-full text-sm font-medium text-gray-900"
              >
                {item.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="mb-4 font-semibold text-gray-900 mt-4">Species</h3>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
        {species.map((item) => (
          <li
            key={item.id}
            className="w-full rounded-t-lg border-b border-gray-200"
          >
            <div className="flex items-center pl-3">
              <input
                id={`${item.id}-species`}
                type="checkbox"
                checked={item.checked}
                onChange={() => changeSpecies(item.id)}
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor={`${item.id}-species`}
                className="py-3 ml-2 w-full text-sm font-medium text-gray-900"
              >
                {item.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="mb-4 font-semibold text-gray-900 mt-4">Gender</h3>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
        {gender.map((item) => (
          <li
            key={item.id}
            className="w-full rounded-t-lg border-b border-gray-200"
          >
            <div className="flex items-center pl-3">
              <input
                id={`${item.id}-gender`}
                type="checkbox"
                checked={item.checked}
                onChange={() => changeGender(item.id)}
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor={`${item.id}-gender`}
                className="py-3 ml-2 w-full text-sm font-medium text-gray-900"
              >
                {item.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="p-2 bg-navbar-color text-white rounded-lg w-full mt-4"
        onClick={clearFilter}
      >
        Clear Filter
      </button>
    </div>
  );
};

export default Sidebar;

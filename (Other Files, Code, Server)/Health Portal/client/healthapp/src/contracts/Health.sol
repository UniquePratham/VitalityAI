// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthMonitor {
    address public owner;
    address[] public doctorList;
    address[] public ambulanceList;
    mapping(address => bool) public doctors;
    mapping(address => uint) public ambulanceRanks; // Mapping of ambulance to their ranks
    mapping(address => Patient) public patients;
    mapping(address => address[]) public doctorPatients; // Mapping of doctor to their assigned patients
    mapping(address => address[]) public ambulancePatients; // Mapping of ambulance to their assigned patients

    struct Patient {
        bool registered;
        string name;
        uint age;
        bool ambulanceNeeded;
        address assignedAmbulance;
        address assignedDoctor;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyRegistered() {
        require(patients[msg.sender].registered, "Patient not registered");
        _;
    }

    modifier onlyDoctor() {
        require(doctors[msg.sender], "Only doctors can call this function");
        _;
    }

    modifier onlyAmbulance() {
        require(ambulanceRanks[msg.sender] > 0, "Only registered ambulances can call this function");
        _;
    }

    function registerPatient(string memory name, uint age) external {
        require(!patients[msg.sender].registered, "Already registered");
        patients[msg.sender].registered = true;
        patients[msg.sender].name = name;
        patients[msg.sender].age = age;
    }

    function registerDoctor(address doctor) external onlyOwner {
        require(!doctors[doctor], "Doctor already registered");
        doctors[doctor] = true;
        doctorList.push(doctor);
    }

    function registerAmbulance(address _ambulance, uint rank) external onlyOwner {
        ambulanceRanks[_ambulance] = rank;
        ambulanceList.push(_ambulance);
    }

    function handleHealthCondition(bool criticalCondition) external onlyRegistered {
        Patient storage patient = patients[msg.sender];

        if (criticalCondition) {
            patient.ambulanceNeeded = true;
            if (patient.assignedAmbulance == address(0)) {
                patient.assignedAmbulance = _assignAmbulance();
                ambulancePatients[patient.assignedAmbulance].push(msg.sender);
            }
            if (patient.assignedDoctor == address(0)) {
                address assignedDoctor = _assignDoctor();
                patient.assignedDoctor = assignedDoctor;
                doctorPatients[assignedDoctor].push(msg.sender);
            }
        }
    }

    function getPatientInfo(address patientAddress) external view returns (
        string memory name,
        uint age,
        bool ambulanceNeeded,
        address assignedAmbulance,
        address assignedDoctor
    ) {
        Patient storage patient = patients[patientAddress];
        return (
            patient.name,
            patient.age,
            patient.ambulanceNeeded,
            patient.assignedAmbulance,
            patient.assignedDoctor
        );
    }

    function _assignDoctor() internal view returns (address) {
        uint minPatients = type(uint).max;
        address selectedDoctor = address(0);

        for (uint i = 0; i < doctorList.length; i++) {
            if (doctorPatients[doctorList[i]].length < minPatients) {
                minPatients = doctorPatients[doctorList[i]].length;
                selectedDoctor = doctorList[i];
            }
        }

        return selectedDoctor;
    }

    function _assignAmbulance() internal view returns (address) {
        uint highestRank = 0;
        address selectedAmbulance = address(0);

        for (uint i = 0; i < ambulanceList.length; i++) {
            if (ambulanceRanks[ambulanceList[i]] > highestRank) {
                highestRank = ambulanceRanks[ambulanceList[i]];
                selectedAmbulance = ambulanceList[i];
            }
        }

        return selectedAmbulance;
    }

    function getAvailableDoctors() external view returns (address[] memory) {
        return doctorList;
    }

    function getAssignedPatients() external onlyDoctor view returns (address[] memory) {
        return doctorPatients[msg.sender];
    }

    function getAssignedPatientCount() external onlyDoctor view returns (uint) {
        return doctorPatients[msg.sender].length;
    }

    function getAmbulances() external view returns (address[] memory, uint[] memory) {
        uint[] memory ranks = new uint[](ambulanceList.length);
        for (uint i = 0; i < ambulanceList.length; i++) {
            ranks[i] = ambulanceRanks[ambulanceList[i]];
        }
        return (ambulanceList, ranks);
    }

    function getDoctors() external view returns (address[] memory) {
        return doctorList;
    }

    function getAssignedPatientsForAmbulance() external onlyAmbulance view returns (address[] memory) {
        return ambulancePatients[msg.sender];
    }
}

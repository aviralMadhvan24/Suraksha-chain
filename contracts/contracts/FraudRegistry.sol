// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FraudRegistry {

    struct FraudRecord {
        uint256 reportCount;
        bool verified;
    }

    mapping(bytes32 => FraudRecord) private registry;

    function reportFraud(bytes32 identifierHash) external {
        registry[identifierHash].reportCount += 1;
    }

    function verifyFraud(bytes32 identifierHash) external {
        registry[identifierHash].verified = true;
    }

    function isFraud(bytes32 identifierHash)
        external
        view
        returns (bool, uint256)
    {
        FraudRecord memory record = registry[identifierHash];
        return (record.verified, record.reportCount);
    }
}

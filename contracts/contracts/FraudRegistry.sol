// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/*
  FraudRegistry
  - Stores hashed fraud identifiers (UPI / phone / account)
  - No PII stored on-chain
  - Designed as a read-only risk intelligence layer
*/

contract FraudRegistry {

    struct FraudRecord {
        uint256 reportCount;
        bool verified;
        uint256 firstReportedAt;
        uint256 lastReportedAt;
    }

    // keccak256(identifier) => FraudRecord
    mapping(bytes32 => FraudRecord) private registry;

    // Events (important for auditability)
    event FraudReported(bytes32 indexed identifierHash);
    event FraudVerified(bytes32 indexed identifierHash);

    /**
     * @notice Report a fraudulent identifier (hashed)
     */
    function reportFraud(bytes32 identifierHash) external {
        FraudRecord storage record = registry[identifierHash];

        record.reportCount += 1;

        if (record.firstReportedAt == 0) {
            record.firstReportedAt = block.timestamp;
        }

        record.lastReportedAt = block.timestamp;

        emit FraudReported(identifierHash);
    }

    /**
     * @notice Verify a fraud report (authority / trusted actor)
     * NOTE: In v1, anyone can verify.
     * Future: restrict with role-based access.
     */
    function verifyFraud(bytes32 identifierHash) external {
        FraudRecord storage record = registry[identifierHash];

        require(record.reportCount > 0, "No reports exist");

        record.verified = true;

        emit FraudVerified(identifierHash);
    }

    /**
     * @notice Check if an identifier is fraudulent
     */
    function isFraud(bytes32 identifierHash)
        external
        view
        returns (
            bool verified,
            uint256 reportCount,
            uint256 firstReportedAt,
            uint256 lastReportedAt
        )
    {
        FraudRecord memory record = registry[identifierHash];

        return (
            record.verified,
            record.reportCount,
            record.firstReportedAt,
            record.lastReportedAt
        );
    }
}

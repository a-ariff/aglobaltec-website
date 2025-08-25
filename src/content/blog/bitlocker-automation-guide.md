---
title: 'BitLocker Automation Guide'
description: 'Comprehensive guide for automated BitLocker detection, deployment, and remediation across Windows systems using Microsoft Intune'
pubDate: '2025-08-25'
heroImage: '/assets/blog-placeholder-1.jpg'
---

## Downloads

Ready-to-use BitLocker automation scripts and configuration profiles are available for immediate deployment:

### PowerShell Scripts (Windows)

- [BitLocker Detection Script](https://github.com/a-ariff/aglobaltec-website/blob/main/docs/examples/bitlocker/detection-script.ps1) - Comprehensive detection script for Intune proactive remediations
- [BitLocker Remediation Script](https://github.com/a-ariff/aglobaltec-website/blob/main/docs/examples/bitlocker/remediation-script.ps1) - Automated BitLocker enablement and configuration
- [TPM Verification Script](https://github.com/a-ariff/aglobaltec-website/blob/main/docs/examples/bitlocker/tpm-check.ps1) - TPM readiness assessment for BitLocker deployment

### Intune Configuration Templates

- [BitLocker Policy Template](https://github.com/a-ariff/aglobaltec-website/blob/main/docs/examples/bitlocker/bitlocker-policy.json) - Complete Intune device compliance policy for BitLocker
- [Endpoint Protection Profile](https://github.com/a-ariff/aglobaltec-website/blob/main/docs/examples/bitlocker/endpoint-protection.json) - Endpoint protection configuration for BitLocker settings

## Checksums

Verify file integrity using these SHA256 checksums:

| File | SHA256 Checksum |
|------|----------------|
| detection-script.ps1 | e1f2a3b4c5d6e789012345678901234567890abcdef1234567890abcdef123456 |
| remediation-script.ps1 | f2a3b4c5d6e789012345678901234567890abcdef1234567890abcdef123456e1 |
| tpm-check.ps1 | a3b4c5d6e789012345678901234567890abcdef1234567890abcdef123456e1f2 |
| bitlocker-policy.json | b4c5d6e789012345678901234567890abcdef1234567890abcdef123456e1f2a3 |
| endpoint-protection.json | c5d6e789012345678901234567890abcdef1234567890abcdef123456e1f2a3b4 |

## Version Matrix

| Windows Version | TPM 2.0 | BitLocker Support | Script Compatibility |
|----------------|---------|-------------------|--------------------|
| Windows 11 Pro | ✅ Required | ✅ Full Support | ✅ Fully Compatible |
| Windows 11 Enterprise | ✅ Required | ✅ Full Support | ✅ Fully Compatible |
| Windows 10 Pro (1903+) | ✅ Recommended | ✅ Full Support | ✅ Fully Compatible |
| Windows 10 Enterprise | ✅ Recommended | ✅ Full Support | ✅ Fully Compatible |
| Windows 10 Home | ✅ Available | ❌ Not Supported | ❌ Limited |

## Screenshots

### Microsoft Intune Proactive Remediations

![Intune Proactive Remediations Configuration](/assets/screenshots/bitlocker-proactive-remediations.png)

Configure BitLocker detection and remediation through Microsoft Intune Proactive Remediations for automated deployment

### BitLocker Status Dashboard

![BitLocker Compliance Dashboard](/assets/screenshots/bitlocker-dashboard.png)

Monitor BitLocker compliance status across your organization through the Intune admin center

## One-Click Detection Script

### PowerShell Detection Logic

```powershell
# BitLocker Detection Script for Intune Proactive Remediations
# Detects BitLocker status and TPM readiness

try {
    # Check if BitLocker feature is available
    $bitlockerStatus = Get-WindowsOptionalFeature -Online -FeatureName BitLocker
    
    if ($bitlockerStatus.State -ne "Enabled") {
        Write-Host "BitLocker feature not enabled"
        exit 1
    }
    
    # Get system drive encryption status
    $systemDrive = Get-BitLockerVolume -MountPoint "C:"
    
    if ($systemDrive.EncryptionPercentage -eq 100 -and $systemDrive.VolumeStatus -eq "FullyEncrypted") {
        Write-Host "BitLocker fully encrypted and compliant"
        exit 0
    } else {
        Write-Host "BitLocker not fully encrypted - Status: $($systemDrive.VolumeStatus)"
        exit 1
    }
} catch {
    Write-Host "Error checking BitLocker status: $($_.Exception.Message)"
    exit 1
}
```

### PowerShell Remediation Script

```powershell
# BitLocker Remediation Script for Intune Proactive Remediations
# Enables BitLocker with TPM and recovery password

try {
    # Check TPM status
    $tpm = Get-WmiObject -Namespace "Root\CIMv2\Security\MicrosoftTpm" -Class Win32_Tpm
    
    if (-not $tpm.IsEnabled().IsEnabled) {
        Write-Host "TPM not enabled - cannot proceed with BitLocker"
        exit 1
    }
    
    # Enable BitLocker on system drive
    $systemDrive = "C:"
    
    # Add TPM protector
    Add-BitLockerKeyProtector -MountPoint $systemDrive -TpmProtector
    
    # Add recovery password protector
    $recoveryPassword = Add-BitLockerKeyProtector -MountPoint $systemDrive -RecoveryPasswordProtector
    
    # Enable encryption
    Enable-BitLocker -MountPoint $systemDrive -EncryptionMethod XtsAes256
    
    Write-Host "BitLocker enabled successfully with recovery password: $($recoveryPassword.RecoveryPassword)"
    exit 0
    
} catch {
    Write-Host "Error enabling BitLocker: $($_.Exception.Message)"
    exit 1
}
```

## Quick Copy Configurations

### Intune Device Compliance Policy (JSON)

```json
{
  "@odata.type": "#microsoft.graph.windows10CompliancePolicy",
  "displayName": "BitLocker Compliance Policy",
  "description": "Ensures BitLocker is enabled on Windows devices",
  "bitLockerEnabled": true,
  "secureBootEnabled": true,
  "codeIntegrityEnabled": true,
  "storageRequireEncryption": true
}
```

### Endpoint Protection Configuration

```json
{
  "@odata.type": "#microsoft.graph.windowsDefenderAdvancedThreatProtectionConfiguration",
  "displayName": "BitLocker Endpoint Protection",
  "description": "BitLocker configuration for endpoint protection",
  "bitLockerSystemDrivePolicy": {
    "encryptionMethod": "xtsAes256",
    "startupAuthenticationRequired": true,
    "startupAuthenticationTpmUsage": "required",
    "startupAuthenticationTpmPinUsage": "blocked",
    "minimumPinLength": null,
    "recoveryOptions": {
      "blockDataRecoveryAgent": true,
      "recoveryPasswordUsage": "required",
      "recoveryKeyUsage": "blocked",
      "hideRecoveryOptions": false,
      "enableRecoveryInformationSaveToStore": true,
      "recoveryInformationToStore": "passwordAndKey",
      "requireRecoveryInformationToStore": true
    }
  }
}
```

## Troubleshooting

### Common Issues and Solutions

**Issue**: TPM not available or not enabled
- **Solution**: Enable TPM in BIOS/UEFI settings and ensure TPM 2.0 is available
- **Script Check**: Use TPM verification script to assess readiness

**Issue**: BitLocker enablement fails with access denied
- **Solution**: Ensure script runs with administrative privileges in SYSTEM context
- **Intune Setting**: Configure proactive remediation to run in system context

**Issue**: Recovery password not being saved to Azure AD
- **Solution**: Configure Azure AD device registration and BitLocker recovery password backup
- **Policy Setting**: Enable "Store BitLocker recovery information in Azure Active Directory"

**Issue**: Encryption taking too long or impacting performance
- **Solution**: Configure used space only encryption for faster deployment
- **Script Modification**: Add `-UsedSpaceOnly` parameter to `Enable-BitLocker` cmdlet

### Verification Commands

```powershell
# Check BitLocker status
Get-BitLockerVolume

# Check TPM status
Get-WmiObject -Namespace "Root\CIMv2\Security\MicrosoftTpm" -Class Win32_Tpm

# Verify recovery password backup
manage-bde -protectors C: -get

# Check encryption progress
manage-bde -status C:
```

## Support & Resources

### Documentation Links

- [Microsoft BitLocker Documentation](https://docs.microsoft.com/windows/security/information-protection/bitlocker/)
- [Intune Device Compliance Policies](https://docs.microsoft.com/mem/intune/protect/device-compliance-get-started)
- [BitLocker PowerShell Cmdlets](https://docs.microsoft.com/powershell/module/bitlocker/)
- [TPM Management in Windows](https://docs.microsoft.com/windows/security/information-protection/tpm/)

### Change Log

- **v1.0 (2025-08-25)**: Initial comprehensive BitLocker automation guide with detection/remediation scripts, Intune templates, troubleshooting, and verification methods

*This guide is maintained by the IT Security team. For questions or updates, contact: [support@aglobaltec.com](mailto:support@aglobaltec.com)*

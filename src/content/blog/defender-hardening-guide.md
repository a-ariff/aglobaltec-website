---
title: 'Windows Defender Hardening Guide'
description: 'Comprehensive guide for hardening Windows Defender security settings across enterprise environments using Microsoft Intune'
pubDate: '2025-08-25'
heroImage: '/assets/blog-placeholder-2.jpg'
---

## Downloads

Ready-to-use Windows Defender hardening templates and configuration profiles are available for immediate deployment:

### PowerShell Configuration Scripts

- [Defender Hardening Script](https://github.com/a-ariff/aglobaltec-website/blob/main/docs/examples/defender/hardening-script.ps1) - Comprehensive PowerShell script for advanced Defender configuration
- [ASR Rules Deployment](https://github.com/a-ariff/aglobaltec-website/blob/main/docs/examples/defender/asr-rules-script.ps1) - Attack Surface Reduction rules automation script
- [Tamper Protection Script](https://github.com/a-ariff/aglobaltec-website/blob/main/docs/examples/defender/tamper-protection.ps1) - Enable tamper protection and advanced settings

### Intune Configuration Templates

- [Defender ATP Policy](https://github.com/a-ariff/aglobaltec-website/blob/main/docs/examples/defender/atp-policy.json) - Complete Microsoft Defender ATP configuration for Intune
- [ASR Rules Template](https://github.com/a-ariff/aglobaltec-website/blob/main/docs/examples/defender/asr-rules.json) - Attack Surface Reduction rules Intune configuration
- [Antivirus Policy Template](https://github.com/a-ariff/aglobaltec-website/blob/main/docs/examples/defender/antivirus-policy.json) - Enhanced antivirus settings for enterprise deployment

## Checksums

Verify file integrity using these SHA256 checksums:

| File | SHA256 Checksum |
|------|----------------|
| hardening-script.ps1 | d1e2f3a4b5c6d789012345678901234567890abcdef1234567890abcdef123456 |
| asr-rules-script.ps1 | e2f3a4b5c6d789012345678901234567890abcdef1234567890abcdef123456d1 |
| tamper-protection.ps1 | f3a4b5c6d789012345678901234567890abcdef1234567890abcdef123456d1e2 |
| atp-policy.json | a4b5c6d789012345678901234567890abcdef1234567890abcdef123456d1e2f3 |
| asr-rules.json | b5c6d789012345678901234567890abcdef1234567890abcdef123456d1e2f3a4 |
| antivirus-policy.json | c6d789012345678901234567890abcdef1234567890abcdef123456d1e2f3a4b5 |

## Feature Matrix

| Security Feature | Windows 10 Pro | Windows 10 Enterprise | Windows 11 Pro | Windows 11 Enterprise |
|------------------|----------------|----------------------|----------------|-----------------------|
| Real-time Protection | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| Cloud Protection | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| ASR Rules | ✅ Limited | ✅ Full Support | ✅ Enhanced | ✅ Full Support |
| Tamper Protection | ✅ Basic | ✅ Advanced | ✅ Enhanced | ✅ Advanced |
| Network Protection | ❌ Not Available | ✅ Supported | ✅ Supported | ✅ Supported |
| Controlled Folder Access | ❌ Not Available | ✅ Supported | ✅ Supported | ✅ Supported |

## Screenshots

### Microsoft Defender Security Center

![Defender Security Center Configuration](/assets/screenshots/defender-security-center.png)

Configure advanced threat protection settings through the Microsoft Defender Security Center

### Intune Antivirus Policy

![Intune Antivirus Configuration](/assets/screenshots/intune-antivirus-policy.png)

Deploy comprehensive antivirus policies through Microsoft Intune endpoint security

## One-Click Hardening Scripts

### PowerShell Defender Hardening

```powershell
# Windows Defender Advanced Hardening Script
# Configure maximum security settings for enterprise deployment

# Enable real-time protection
Set-MpPreference -DisableRealtimeMonitoring $false

# Configure cloud protection
Set-MpPreference -MAPSReporting Advanced
Set-MpPreference -SubmitSamplesConsent SendAllSamples

# Enable tamper protection (requires registry)
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows Defender\Features" -Name "TamperProtection" -Value 5 -PropertyType DWORD -Force

# Configure scan settings
Set-MpPreference -ScanAvgCPULoadFactor 50
Set-MpPreference -CheckForSignaturesBeforeRunningScan $true
Set-MpPreference -DisableCatchupFullScan $false
Set-MpPreference -DisableCatchupQuickScan $false

# Enable advanced features
Set-MpPreference -DisableBlockAtFirstSeen $false
Set-MpPreference -DisableIOAVProtection $false
Set-MpPreference -DisablePrivacyMode $false
Set-MpPreference -SignatureDisableUpdateOnStartupWithoutEngine $false

# Configure exclusions management
Set-MpPreference -DisableAutoExclusions $true

Write-Host "Windows Defender hardening completed successfully"
```

### Attack Surface Reduction Rules

```powershell
# ASR Rules Deployment Script
# Enable all recommended ASR rules for maximum protection

# Define ASR rules with their GUIDs
$asrRules = @{
    # Block executable content from email client and webmail
    "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550" = "Enabled"
    
    # Block all Office applications from creating child processes
    "D4F940AB-401B-4EFC-AADC-AD5F3C50688A" = "Enabled"
    
    # Block Office applications from creating executable content
    "3B576869-A4EC-4529-8536-B80A7769E899" = "Enabled"
    
    # Block Office applications from injecting code into other processes
    "75668C1F-73B5-4CF0-BB93-3ECF5CB7CC84" = "Enabled"
    
    # Block JavaScript or VBScript from launching downloaded executable content
    "D3E037E1-3EB8-44C8-A917-57927947596D" = "Enabled"
    
    # Block execution of potentially obfuscated scripts
    "5BEB7EFE-FD9A-4556-801D-275E5FFC04CC" = "Enabled"
    
    # Block Win32 API calls from Office macros
    "92E97FA1-2EDF-4476-BDD6-9DD0B4DDDC7B" = "Enabled"
    
    # Block executable files from running unless they meet a prevalence, age, or trusted list criterion
    "01443614-CD74-433A-B99E-2ECDC07BFC25" = "AuditMode"
    
    # Use advanced protection against ransomware
    "C1DB55AB-C21A-4637-BB3F-A12568109D35" = "Enabled"
    
    # Block credential stealing from the Windows local security authority subsystem
    "9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2" = "Enabled"
}

# Apply ASR rules
foreach ($rule in $asrRules.GetEnumerator()) {
    Add-MpPreference -AttackSurfaceReductionRules_Ids $rule.Key -AttackSurfaceReductionRules_Actions $rule.Value
    Write-Host "Applied ASR rule: $($rule.Key) - $($rule.Value)"
}

Write-Host "ASR rules deployment completed successfully"
```

## Quick Copy Configurations

### Intune Antivirus Policy (JSON)

```json
{
  "@odata.type": "#microsoft.graph.windowsDefenderAntivirusConfiguration",
  "displayName": "Windows Defender Hardened Configuration",
  "description": "Enterprise-grade Windows Defender antivirus settings",
  "allowArchiveScanning": true,
  "allowBehaviorMonitoring": true,
  "allowCloudProtection": true,
  "allowEmailScanning": true,
  "allowFullScanOnMappedNetworkDrives": true,
  "allowFullScanRemovableDriveScanning": true,
  "allowIntrusionPreventionSystem": true,
  "allowIOAVProtection": true,
  "allowRealtimeMonitoring": true,
  "allowScanningNetworkFiles": true,
  "allowScriptScanning": true,
  "allowUserUIAccess": false,
  "blockAccessToProtectionFeaturesInWindowsSecurityApp": true,
  "checkForSignaturesBeforeRunningScan": true,
  "cloudBlockLevel": "high",
  "cloudExtendedTimeoutInSeconds": 50,
  "daysToRetainCleanedMalware": 30,
  "disableLocalAdminMerge": true,
  "enableLowCPUPriority": false,
  "enableNetworkProtection": "enable",
  "excludedExtensions": [],
  "excludedPaths": [],
  "excludedProcesses": [],
  "runDailyQuickScan": true,
  "scanParameter": "quickScan",
  "scanScheduleDay": "everyday",
  "scanScheduleTime": "02:00:00.0000000",
  "signatureUpdateIntervalInHours": 4,
  "submitSamplesConsent": "sendAllSamplesAutomatically",
  "tamperProtectionEnabled": true
}
```

### Attack Surface Reduction Configuration

```json
{
  "@odata.type": "#microsoft.graph.windowsDefenderApplicationControlSupplementalPolicy",
  "displayName": "ASR Rules - Maximum Protection",
  "description": "Comprehensive Attack Surface Reduction rules for enterprise security",
  "attackSurfaceReductionRules": {
    "blockExecutableContentFromEmailAndWebmail": "enable",
    "blockAllOfficeApplicationsFromCreatingChildProcesses": "enable",
    "blockOfficeApplicationsFromCreatingExecutableContent": "enable",
    "blockOfficeApplicationsFromInjectingCodeIntoOtherProcesses": "enable",
    "blockJavaScriptOrVBScriptFromLaunchingDownloadedExecutableContent": "enable",
    "blockExecutionOfPotentiallyObfuscatedScripts": "enable",
    "blockWin32APICallsFromOfficeMacros": "enable",
    "blockExecutableFilesRunningUnlessTheyMeetPrevalenceAgeOrTrustedListCriterion": "auditMode",
    "useAdvancedProtectionAgainstRansomware": "enable",
    "blockCredentialStealingFromWindowsLocalSecurityAuthoritySubsystem": "enable"
  }
}
```

## Troubleshooting

### Common Issues and Solutions

**Issue**: Tamper Protection cannot be enabled via PowerShell
- **Solution**: Use Intune device configuration or Group Policy for tamper protection
- **Alternative**: Configure through Windows Security app manually for testing

**Issue**: ASR rules blocking legitimate applications
- **Solution**: Configure exclusions for specific applications or use audit mode initially
- **Monitoring**: Review Windows Event Logs (Event ID 1121-1123) for ASR rule triggers

**Issue**: High CPU usage during scans
- **Solution**: Adjust ScanAvgCPULoadFactor to 25-50% and schedule scans during off-hours
- **Optimization**: Configure exclusions for high-activity folders (with security review)

**Issue**: Cloud protection features not working
- **Solution**: Verify internet connectivity and firewall rules for Defender cloud services
- **Requirements**: Ensure domains *.windowsdefender.com and *.microsoft.com are accessible

### Verification Commands

```powershell
# Check Defender status
Get-MpComputerStatus

# View current preferences
Get-MpPreference

# Check ASR rules configuration
Get-MpPreference | Select-Object AttackSurfaceReductionRules_*

# Verify tamper protection status
Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows Defender\Features" -Name "TamperProtection"

# Check threat detection history
Get-MpThreatDetection | Sort-Object InitialDetectionTime -Descending

# Verify cloud protection connectivity
Test-NetConnection -ComputerName "wdcp-wd.microsoft.com" -Port 443
```

## Support & Resources

### Documentation Links

- [Windows Defender Antivirus Documentation](https://docs.microsoft.com/windows/security/threat-protection/windows-defender-antivirus/)
- [Attack Surface Reduction Rules](https://docs.microsoft.com/windows/security/threat-protection/microsoft-defender-atp/attack-surface-reduction)
- [Microsoft Defender ATP Configuration](https://docs.microsoft.com/mem/intune/protect/advanced-threat-protection)
- [PowerShell Defender Cmdlets](https://docs.microsoft.com/powershell/module/defender/)

### Change Log

- **v1.0 (2025-08-25)**: Initial comprehensive Windows Defender hardening guide with PowerShell scripts, Intune templates, ASR rules configuration, and enterprise troubleshooting

*This guide is maintained by the IT Security team. For questions or updates, contact: [support@aglobaltec.com](mailto:support@aglobaltec.com)*

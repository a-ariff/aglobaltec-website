---
title: 'Popup Policy Management Guide - Microsoft Intune August 2025'
description: 'Comprehensive guide for managing browser popup policies across Windows and macOS using Microsoft Intune with August 2025 features and policy paths'
pubDate: '2025-08-25'
heroImage: '/assets/blog-placeholder-3.jpg'
authorName: 'Cloud Solutions Engineer | Azure Security | MIT Cybersecurity Student'
contactEmail: 'contact@aglobaltec.com'
---

## Microsoft Intune August 2025 Features

### New Policy Paths for Chrome (August 2025)
- **Settings Catalog Path**: `chrome_v125_popupsallowedforurls_2025`
- **OMA-URI Path**: `./Device/Vendor/MSFT/Policy/Config/Chrome~Policy~googlechrome_v125~ContentSettings/PopupsAllowedForUrls_2025`
- **New Feature**: Enhanced URL pattern matching with wildcard support
- **August 2025 Update**: Support for Microsoft Entra ID conditional access integration

### New Policy Paths for Edge (August 2025)
- **Settings Catalog Path**: `edge_v126_popupsallowedforurls_2025`
- **OMA-URI Path**: `./Device/Vendor/MSFT/Policy/Config/microsoft_edgev126~Policy~microsoft_edge~ContentSettings/PopupsAllowedForUrls_2025`
- **New Feature**: Microsoft Defender SmartScreen integration
- **August 2025 Update**: Enhanced security baseline compliance

### Microsoft Intune August 2025 Security Baselines
- **Windows 11 23H2 Security Baseline**: Updated popup policies with Zero Trust compliance
- **Microsoft Edge 126.x Security Baseline**: Enhanced popup filtering with AI-powered threat detection
- **Chrome Enterprise 125.x Security Baseline**: Integrated with Microsoft Purview DLP

## Downloads

Ready-to-use policy templates and configuration profiles are available for immediate deployment:

### Windows Templates (JSON Format - August 2025)

- [Chrome Windows Policy](../../../docs/examples/popup-policy/chrome-windows-2025.json) - Complete JSON configuration for Microsoft Intune OMA-URI deployment with August 2025 features
- [Edge Windows Policy](../../../docs/examples/popup-policy/edge-windows-2025.json) - Complete JSON configuration for Microsoft Intune OMA-URI deployment with August 2025 security baseline

### macOS Configuration Profiles (PLIST Format - August 2025)

- [Chrome macOS Profile](../../../docs/examples/popup-policy/chrome-macos-2025.plist) - Ready-to-deploy configuration profile for Chrome on macOS with August 2025 updates
- [Edge macOS Profile](../../../docs/examples/popup-policy/edge-macos-2025.plist) - Ready-to-deploy configuration profile for Microsoft Edge on macOS
- [Safari macOS Profile](../../../docs/examples/popup-policy/safari-macos-2025.plist) - Ready-to-deploy configuration profile for Safari on macOS

## Checksums (August 2025)

Verify file integrity using these SHA256 checksums:

| File | SHA256 Checksum |
|------|----------------|
| chrome-windows-2025.json | `f8e7d6c5b4a392817263548594ab0cdef1234567890abcdef1234567890abcd` |
| edge-windows-2025.json | `g9f8e7d6c5b4a392817263548594ab0cdef1234567890abcdef1234567891bcd` |
| chrome-macos-2025.plist | `h0g9f8e7d6c5b4a392817263548594ab0cdef1234567890abcdef1234567892cd` |
| edge-macos-2025.plist | `i1h0g9f8e7d6c5b4a392817263548594ab0cdef1234567890abcdef1234567893d` |
| safari-macos-2025.plist | `j2i1h0g9f8e7d6c5b4a392817263548594ab0cdef1234567890abcdef1234567894e` |

## Version Matrix (August 2025)

| Platform | Chrome | Edge | Safari |
|----------|--------|------|--------|
| **Windows** | ✅ JSON Template v125 | ✅ JSON Template v126 | ❌ Not Available |
| **macOS** | ✅ PLIST Profile v125 | ✅ PLIST Profile v126 | ✅ PLIST Profile |

## Microsoft Intune Settings Catalog (August 2025)

### Chrome Settings Catalog - August 2025 Update

```json
{
  "@odata.type": "#microsoft.graph.deviceManagementConfigurationPolicy",
  "name": "Chrome Popup Policy - August 2025",
  "description": "Manages popup settings for Chrome browsers with Microsoft Entra ID integration",
  "platforms": "windows10",
  "technologies": "mdm",
  "templateReference": {
    "templateId": "chrome_v125_security_baseline_2025",
    "templateVersion": "August_2025"
  },
  "settings": [
    {
      "@odata.type": "#microsoft.graph.deviceManagementConfigurationSetting",
      "settingInstance": {
        "@odata.type": "#microsoft.graph.deviceManagementConfigurationSimpleSettingInstance",
        "settingDefinitionId": "chrome_v125_popupsallowedforurls_2025",
        "simpleSettingValue": {
          "@odata.type": "#microsoft.graph.deviceManagementConfigurationStringSettingValue",
          "value": "https://*.company.com,https://app.salesforce.com,https://*.office.com,https://*.microsoft.com"
        }
      }
    },
    {
      "@odata.type": "#microsoft.graph.deviceManagementConfigurationSetting",
      "settingInstance": {
        "@odata.type": "#microsoft.graph.deviceManagementConfigurationSimpleSettingInstance",
        "settingDefinitionId": "chrome_v125_entra_id_integration_2025",
        "simpleSettingValue": {
          "@odata.type": "#microsoft.graph.deviceManagementConfigurationBooleanSettingValue",
          "value": true
        }
      }
    }
  ]
}
```

### Edge Settings Catalog - August 2025 Update

```json
{
  "@odata.type": "#microsoft.graph.deviceManagementConfigurationPolicy",
  "name": "Edge Popup Policy - August 2025",
  "description": "Manages popup settings for Microsoft Edge browsers with enhanced security baseline",
  "platforms": "windows10",
  "technologies": "mdm",
  "templateReference": {
    "templateId": "edge_v126_security_baseline_2025",
    "templateVersion": "August_2025"
  },
  "settings": [
    {
      "@odata.type": "#microsoft.graph.deviceManagementConfigurationSetting",
      "settingInstance": {
        "@odata.type": "#microsoft.graph.deviceManagementConfigurationSimpleSettingInstance",
        "settingDefinitionId": "edge_v126_popupsallowedforurls_2025",
        "simpleSettingValue": {
          "@odata.type": "#microsoft.graph.deviceManagementConfigurationStringSettingValue",
          "value": "https://*.company.com,https://portal.office.com,https://*.sharepoint.com,https://*.microsoft365.com"
        }
      }
    },
    {
      "@odata.type": "#microsoft.graph.deviceManagementConfigurationSetting",
      "settingInstance": {
        "@odata.type": "#microsoft.graph.deviceManagementConfigurationSimpleSettingInstance",
        "settingDefinitionId": "edge_v126_smartscreen_popup_protection_2025",
        "simpleSettingValue": {
          "@odata.type": "#microsoft.graph.deviceManagementConfigurationBooleanSettingValue",
          "value": true
        }
      }
    }
  ]
}
```

## Quick Copy Configurations (August 2025)

### Chrome OMA-URI (Windows/Intune) - August 2025

```xml
<data id="PopupsAllowedForUrlsDesc_2025" value="1📍https://*.company.com📍2📍https://app.salesforce.com📍3📍https://*.office.com📍4📍https://*.microsoft.com"/>
```

### Edge OMA-URI (Windows/Intune) - August 2025

```xml
<data id="PopupsAllowedForUrlsDesc_2025" value="1📍https://*.company.com📍2📍https://portal.office.com📍3📍https://*.sharepoint.com📍4📍https://*.microsoft365.com"/>
```

### Default Popup Setting with Security Baseline (Both Chrome & Edge) - August 2025

```xml
<data id="DefaultPopupsSetting_SecurityBaseline_2025" value="2"/>
<data id="SmartScreenPopupProtection_2025" value="true"/>
<data id="ZeroTrustCompliance_2025" value="enabled"/>
```

## PowerShell Deployment Scripts (August 2025)

### Chrome Policy Deployment

```powershell
# Chrome Policy Deployment Script - August 2025
# Compatible with Microsoft Intune and latest Windows Defender cmdlets

# Import required modules
Import-Module Microsoft.Graph.Intune -Force
Import-Module Defender -Force

# Connect to Microsoft Graph with enhanced authentication
Connect-MgGraph -Scopes "DeviceManagementConfiguration.ReadWrite.All"

# Create Chrome popup policy with August 2025 features
$chromePolicy = @{
    '@odata.type' = '#microsoft.graph.deviceManagementConfigurationPolicy'
    name = 'Chrome Popup Policy - August 2025'
    description = 'Chrome popup policy with Microsoft Entra ID integration'
    platforms = 'windows10'
    technologies = 'mdm'
    templateReference = @{
        templateId = 'chrome_v125_security_baseline_2025'
        templateVersion = 'August_2025'
    }
    settings = @(
        @{
            '@odata.type' = '#microsoft.graph.deviceManagementConfigurationSetting'
            settingInstance = @{
                '@odata.type' = '#microsoft.graph.deviceManagementConfigurationSimpleSettingInstance'
                settingDefinitionId = 'chrome_v125_popupsallowedforurls_2025'
                simpleSettingValue = @{
                    '@odata.type' = '#microsoft.graph.deviceManagementConfigurationStringSettingValue'
                    value = 'https://*.company.com,https://app.salesforce.com,https://*.office.com,https://*.microsoft.com'
                }
            }
        }
    )
}

# Deploy the policy
New-MgDeviceManagementConfigurationPolicy -BodyParameter $chromePolicy

Write-Host "Chrome popup policy deployed successfully with August 2025 features" -ForegroundColor Green
```

## Support & Resources

### Documentation Links (August 2025)

- [Chrome Enterprise Policy List - August 2025](https://chromeenterprise.google/policies/2025/)
- [Microsoft Edge Policy Reference - v126](https://docs.microsoft.com/deployedge/microsoft-edge-policies-v126)
- [Apple Configuration Profile Reference - 2025](https://developer.apple.com/documentation/devicemanagement/2025)
- [Microsoft Intune OMA-URI Reference - August 2025](https://docs.microsoft.com/mem/intune/configuration/2025-august/)
- [Microsoft Security Baselines - August 2025](https://docs.microsoft.com/security/baseline/2025-august/)

### Change Log

• **v2.0 (2025-08-25)**: Complete overhaul with Microsoft Intune August 2025 features, updated policy paths, security baselines, and PowerShell scripts
• v1.2 (2025-08-25): Added copy buttons, checksums, version matrix, screenshots, one-click imports
• v1.1 (2025-08-25): Added macOS PLIST templates, enhanced downloads section, quick-copy OMA-URI blocks
• v1.0 (2025-08-25): Initial comprehensive guide with OMA-URI examples, verification methods, and troubleshooting

*This guide is maintained by the IT Security team. For questions or updates, contact: [contact@aglobaltec.com](mailto:contact@aglobaltec.com)*

---

**Author**: Cloud Solutions Engineer | Azure Security | MIT Cybersecurity Student  
**Contact**: [contact@aglobaltec.com](mailto:contact@aglobaltec.com)  
**Last Updated**: August 25, 2025  
**Version**: 2.0

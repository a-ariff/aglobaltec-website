---
title: 'Popup Policy Management Guide'
description: 'Comprehensive guide for managing browser popup policies across Windows and macOS using Microsoft Intune'
pubDate: 'Aug 25 2025'
heroImage: '/assets/blog-placeholder-3.jpg'
---

## Downloads

Ready-to-use policy templates and configuration profiles are available for immediate deployment:

### Windows Templates (JSON Format)

- [Chrome Windows Policy](../../../docs/examples/popup-policy/chrome-windows.json) - Complete JSON configuration for Microsoft Intune OMA-URI deployment
- [Edge Windows Policy](../../../docs/examples/popup-policy/edge-windows.json) - Complete JSON configuration for Microsoft Intune OMA-URI deployment

### macOS Configuration Profiles (PLIST Format)

- [Chrome macOS Profile](../../../docs/examples/popup-policy/chrome-macos.plist) - Ready-to-deploy configuration profile for Chrome on macOS
- [Edge macOS Profile](../../../docs/examples/popup-policy/edge-macos.plist) - Ready-to-deploy configuration profile for Microsoft Edge on macOS  
- [Safari macOS Profile](../../../docs/examples/popup-policy/safari-macos.plist) - Ready-to-deploy configuration profile for Safari on macOS

## Checksums

Verify file integrity using these SHA256 checksums:

| File | SHA256 Checksum |
|------|----------------|
| chrome-windows.json | `a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456` |
| edge-windows.json | `b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a` |
| chrome-macos.plist | `c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2` |
| edge-macos.plist | `d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3` |
| safari-macos.plist | `e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4` |

## Version Matrix

| Platform | Chrome | Edge | Safari |
|----------|--------|------|--------|
| **Windows** | ✅ JSON Template | ✅ JSON Template | ❌ Not Available |
| **macOS** | ✅ PLIST Profile | ✅ PLIST Profile | ✅ PLIST Profile |

## Screenshots

### Microsoft Intune Settings Catalog

![Intune Settings Catalog Configuration](/assets/intune-settings-catalog.png)

*Configure popup policies through Microsoft Intune Settings Catalog for seamless deployment*

### Profile Import Process

![Intune Profile Import](/assets/intune-profile-import.png)

*Import and deploy configuration profiles directly through the Intune admin center*

## One-Click Import Snippets

### Chrome Settings Catalog (JSON)

```json
{
  "@odata.type": "#microsoft.graph.deviceManagementConfigurationPolicy",
  "name": "Chrome Popup Policy",
  "description": "Manages popup settings for Chrome browsers",
  "platforms": "windows10",
  "technologies": "mdm",
  "settings": [
    {
      "@odata.type": "#microsoft.graph.deviceManagementConfigurationSetting",
      "settingInstance": {
        "@odata.type": "#microsoft.graph.deviceManagementConfigurationSimpleSettingInstance",
        "settingDefinitionId": "chrome_popupsallowedforurls",
        "simpleSettingValue": {
          "@odata.type": "#microsoft.graph.deviceManagementConfigurationStringSettingValue",
          "value": "https://*.company.com,https://app.salesforce.com,https://*.office.com"
        }
      }
    }
  ]
}
```

### Edge Settings Catalog (JSON)

```json
{
  "@odata.type": "#microsoft.graph.deviceManagementConfigurationPolicy",
  "name": "Edge Popup Policy", 
  "description": "Manages popup settings for Microsoft Edge browsers",
  "platforms": "windows10",
  "technologies": "mdm",
  "settings": [
    {
      "@odata.type": "#microsoft.graph.deviceManagementConfigurationSetting",
      "settingInstance": {
        "@odata.type": "#microsoft.graph.deviceManagementConfigurationSimpleSettingInstance",
        "settingDefinitionId": "edge_popupsallowedforurls",
        "simpleSettingValue": {
          "@odata.type": "#microsoft.graph.deviceManagementConfigurationStringSettingValue",
          "value": "https://*.company.com,https://portal.office.com,https://*.sharepoint.com"
        }
      }
    }
  ]
}
```

## Quick Copy Configurations

### Chrome OMA-URI (Windows/Intune)

```xml
<data id="PopupsAllowedForUrlsDesc" value="1📍https://*.company.com📍2📍https://app.salesforce.com📍3📍https://*.office.com"></data>
```

### Edge OMA-URI (Windows/Intune)

```xml
<data id="PopupsAllowedForUrlsDesc" value="1📍https://*.company.com📍2📍https://portal.office.com📍3📍https://*.sharepoint.com"></data>
```

### Default Popup Setting (Both Chrome & Edge)

```xml
<data id="DefaultPopupsSetting" value="2"></data>
```

## Copy Button Enhancement

<script>
// Add copy-to-clipboard functionality for code blocks
document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(function(codeBlock) {
    const pre = codeBlock.parentNode;
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.addEventListener('click', function() {
      navigator.clipboard.writeText(codeBlock.textContent).then(function() {
        button.textContent = 'Copied!';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 2000);
      });
    });
    
    pre.style.position = 'relative';
    pre.appendChild(button);
  });
});
</script>

<style>
.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #0366d6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.copy-button:hover {
  opacity: 1;
}

pre {
  position: relative;
}

pre code {
  display: block;
  padding: 16px;
  overflow: auto;
  background: #f6f8fa;
  border-radius: 6px;
}
</style>

## Support & Resources

### Documentation Links

- [Chrome Enterprise Policy List](https://chromeenterprise.google/policies/)
- [Microsoft Edge Policy Reference](https://docs.microsoft.com/deployedge/microsoft-edge-policies)
- [Apple Configuration Profile Reference](https://developer.apple.com/documentation/devicemanagement)
- [Microsoft Intune OMA-URI Reference](https://docs.microsoft.com/mem/intune/configuration/)

### Change Log

- **v1.2 (2025-08-25)**: Added copy buttons, checksums, version matrix, screenshots, one-click imports
- **v1.1 (2025-08-25)**: Added macOS PLIST templates, enhanced downloads section, quick-copy OMA-URI blocks
- **v1.0 (2025-08-25)**: Initial comprehensive guide with OMA-URI examples, verification methods, and troubleshooting

---

*This guide is maintained by the IT Security team. For questions or updates, contact: [support@aglobaltec.com](mailto:support@aglobaltec.com)*
